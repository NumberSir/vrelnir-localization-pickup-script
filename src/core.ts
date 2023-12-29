/**
 * 核心逻辑
 */
import {onlyJSFileFilter, onlyTwineFileFilter, walk} from "./utils/file-utils";
import {DIR_DOL_GAME, DIR_DOL_ROOT} from "./consts";
import {promisify} from "util";
import fs from "fs";
import {error, info} from "./log";

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

class CoreProcess {
    private tweeFilepathList: string[];
    private jsFilepathList: string[];

    // 获取所有 twee 和 js 文件路径
    fetchAllFilepaths(): string[][] {
        this.tweeFilepathList = walk(DIR_DOL_GAME, onlyTwineFileFilter);   // 所有 twee 文件绝对路径
        this.jsFilepathList = walk(DIR_DOL_GAME, onlyJSFileFilter);        // 所有 js 文件绝对路径

        info("[INFO] All filepaths have been fetched done!");
        return [this.tweeFilepathList, this.jsFilepathList];
    }
}
