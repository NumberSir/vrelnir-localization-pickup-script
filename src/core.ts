/**
 * 核心逻辑
 */
import {onlyJSFileFilter, onlyTwineFileFilter, walk} from "./utils/file-utils";
import {DIR_DOL_GAME, DIR_DOL_ROOT, DIR_TEMP} from "./consts";
import {promisify} from "util";
import fs from "fs";
import {error, info} from "./log";
import console from "console";
import path from "path";
import {AllPassageInfo, GetAllPassageReturn, PassageInfo, WidgetInfo} from "./models";
import {debug} from "./log";

export async function initDirs() {
    for (const dir of [
        // TODO 要新建的目录们
    ]) {
        await promisify(fs.access)(dir).catch(async () => {
            // 不存在就新建
            return await promisify(fs.mkdir)(dir, {recursive: true});
        }).catch(err => {
            error(`[ERROR] in initDirs() while initializing ${dir}!\n`);
            return Promise.reject(err);
        });
    }
}

export class CoreProcess {
    private tweeFilepathList: string[] = [];
    private jsFilepathList: string[] = [];

    // 获取所有 twee 和 js 文件路径
    getAllFilepaths(): string[][] {
        this.tweeFilepathList = walk(DIR_DOL_GAME, onlyTwineFileFilter);   // 所有 twee 文件绝对路径
        this.jsFilepathList = walk(DIR_DOL_GAME, onlyJSFileFilter);        // 所有 js 文件绝对路径

        info("[INFO] All filepaths have been fetched done!");
        return [this.tweeFilepathList, this.jsFilepathList];
    }

    /**
     * 获取所有段落和段落名，写入 ./data/tmp/all_passages 中两个 json 文件中
     * @param dirPath 目录路径
     */
    async getAllPassages(dirPath: string): Promise<GetAllPassageReturn> {
        console.info(`[INFO] Starting to get all passages' info ...`)
        let outputDir = path.join(DIR_TEMP, "all_passages");
        await promisify(fs.access)(outputDir).catch(async () => {
            await promisify(fs.mkdir)(outputDir, {recursive: true}).catch(async (err) => {
                error(`[ERROR] in getAllPassages() while making dir of ${outputDir}!\n`);
                return Promise.reject(err);
            })
        })

        let allPassages: AllPassageInfo = [];
        let allPassagesNames: string[] = [];
        let allPassagesFile = path.join(outputDir, "all_passages.json");
        let allPassagesNamesFile = path.join(outputDir, "all_passages_names.json");

        let allTwineFiles = walk(dirPath, onlyTwineFileFilter);
        for (let file of allTwineFiles) {
            let content = await promisify(fs.readFile)(file).catch(err => {
                error(`[ERROR] in getAllPassages() while reading ${file}!\n`);
                return Promise.reject(err);
            });

            let contentString = `\n${content.toString().trim()}`
            let contentSlice = contentString.split("\n:: ");
            contentSlice = contentSlice.filter((_, idx) => idx % 2 !== 0);
            // slice 中的偶数元素包含标题

            for (let text of contentSlice) {
                // 标题是第一处换行前的内容
                let passageInfo = {}

                text = text.replace("\r", "\n");
                let passageName = text.split("\n")[0];
                let passageBody = text.split("\n").slice(1, -1).join("\n");
                let passageFull = `:: ${passageName}\n${passageBody}`;
                let passageType = null;

                if (passageName.endsWith("]")) {
                    passageType = passageName.split("[")[1].split("]")[0].trim();
                    passageName = passageName.split("[")[0].trim();
                }

                passageInfo = {
                    passageName: passageName,
                    passageBody: passageBody,
                    passageFull: passageFull,
                    passageType: passageType,
                    filepath: file,
                    filename: path.basename(file, ".twee")
                }

                allPassagesNames.push(passageName);
                allPassages.push(<PassageInfo>passageInfo);
            }
        }

        await promisify(fs.writeFile)(allPassagesFile, JSON.stringify(allPassages)).catch(err => {
            error(`[ERROR] in getAllPassages() while writing in ${allPassagesFile}!\n`);
            return Promise.reject(err)
        });
        await promisify(fs.writeFile)(allPassagesNamesFile, JSON.stringify(allPassagesNames)).catch(err => {
            error(`[ERROR] in getAllPassages() while writing in ${allPassagesNamesFile}!\n`);
            return Promise.reject(err)
        });

        info(`[INFO] All passage info has been fetched done！${allPassagesNames.length} passages in total.`)
        return [allPassagesNames, allPassages]
    }

    /**
     * 把所有段落拆成 .twee 文件，写入 ./data/tmp/all_passages/twine_files 中
     * @param allPassages 获取到所有的段落信息
     */
    async writeAllPassages(allPassages: AllPassageInfo) {
        let outputDir = path.join(DIR_TEMP, "all_passages", "twine_files");
        await promisify(fs.access)(outputDir).catch(async () => {
            await promisify(fs.mkdir)(outputDir).catch(err => {
                error(`[ERROR] in writeAllPassages() while making dir of ${outputDir}!\n`);
                return Promise.reject(err);
            })
        })

        console.info("[INFO] Starting to write in all passages' info ...");
        for (let passage of allPassages) {
            passage.passageName = passage.passageName.replace('/', '_SLASH_');
            let passageFile = path.join(outputDir, `${passage.passageName}.twee`);
            await promisify(fs.writeFile)(passageFile, passage.passageFull).catch(err => {
                error(`[ERROR] in writePassages() while writing in ${passageFile}!\n`);
                return Promise.reject(err)
            });
        }
        info("[INFO] All passages' info have been written done!")
    }

    /**
     * 普通的 widget 是不需要闭合的，如：
     * 定义：<<widget "testOpen">>...<</widget>>
     * 调用：<<testOpen>>
     * 但定义时在末尾添加 container 则需要闭合，如：
     * 定义：<<widget "testClose" container>>...<</widget>>
     * 调用：<<testClose>>...<</testClose>>
     * 因此获取所有 widgets 方便后续切分，写入 .data/tmp/all_passages 中 json 文件中
     * @param allPassages 获取到所有的段落信息
     */
    async getAllWidgets(allPassages: AllPassageInfo): Promise<WidgetInfo[]> {
        console.info(`[INFO] Starting to get all widgets' info ...`)
        let allWidgetsInfo: WidgetInfo[] = [];
        const widgetPattern = /<<widget[\s\S]*?>>/g;
        const widgetNamePattern = /<<widget\s*["'`](.*?)["'`][\s\S]*?>>/g

        for (const passage of allPassages) {
            const allWidgets = passage.passageBody.matchAll(widgetPattern);
            if (!allWidgets) {
                // 不含 widget
                continue;
            }

            for (const widgetFull of allWidgets) {
                const widgetNameMatch = widgetFull[0].match(widgetNamePattern);
                if (!widgetNameMatch) {
                    error("[ERROR] in getAllWidgets() while matching widget name!");
                    throw Error("[ERROR] in getAllWidgets() while matching widget name!");
                }

                let isNeededClose = false;
                if (widgetFull.includes("container>>")) {
                    const isNeededClose = true;  // 需要闭合
                }

                allWidgetsInfo.push({
                    filename: passage.filename,
                    filepath: passage.filepath,
                    isNeededClose: isNeededClose,
                    passageName: passage.passageName,
                    widgetName: widgetNameMatch[0]
                })
            }
        }
        info(`[INFO] All widgets' info have been fetched done！${allWidgetsInfo.length} widgets in total.`)
        return allWidgetsInfo;
    }

    /**
     * 获取到的函数信息写入 .data/tmp/all_passages 中 json 文件中
     * @param allWidgets 获取到所有的函数信息
     */
    async writeAllWidgets(allWidgets: WidgetInfo[]) {
        let outputDir = path.join(DIR_TEMP, "all_passages");
        await promisify(fs.access)(outputDir).catch(async () => {
            await promisify(fs.mkdir)(outputDir).catch(err => {
                error(`[ERROR] in writeAllWidgets() while making dir of ${outputDir}!\n`);
                return Promise.reject(err);
            })
        })

        console.info("[INFO] Starting to write in all widgets' info ...");
        let allWidgetsFile = path.join(outputDir, "all_widgets.json");
        await promisify(fs.writeFile)(allWidgetsFile, JSON.stringify(allWidgets)).catch(err => {
            error(`[ERROR] in writeAllWidgets() while writing in ${allWidgetsFile}!\n`);
            return Promise.reject(err)
        });
        info("[INFO] All widgets' info have been written done!")
    }
}
