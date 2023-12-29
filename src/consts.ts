import path from 'path';
import dotenv from 'dotenv';

dotenv.config()

if (!process.argv[2]) {
    process.argv[2] = "."
}

/* PATHS */
export const DIR_ROOT = path.resolve(path.dirname(process.argv[2]));

export const DIR_DATA = path.join(DIR_ROOT, "data")
export const DIR_DICT = path.join(DIR_DATA, "dict")
export const DIR_DICT_DOWNLOADED = path.join(DIR_DICT, "downloaded")                        // 下载的已经部分或全部本地化的词典
export const DIR_DICT_DOWNLOADED_PARATRANZ = path.join(DIR_DICT_DOWNLOADED, "paratranz")    // 从 paratranz 下载的本地化词典
export const DIR_DICT_DOWNLOADED_WEBLATE = path.join(DIR_DICT_DOWNLOADED, "weblate")        // 从 weblate 下载的本地化词典
export const DIR_DICT_LOCAL = path.join(DIR_DICT, "local")                                  // 本地提取的词典
export const DIR_DICT_LOCAL_RAW = path.join(DIR_DICT_LOCAL, "raw")                          // 未经加工的默认词典

export const DIR_SRC = path.join(DIR_ROOT, "src")
export const DIR_DOL_ROOT = path.join(DIR_SRC, "modules/degrees-of-lewdity")    // 游戏源代码位置
export const DIR_DOL_GAME = path.join(DIR_DOL_ROOT, "game")                     // 游戏源代码里绝大部分 twee 和 js 文件位置

/* TOKENS */
export const PARATRANZ_PROJECT_ID = 4780
export const PARATRANZ_TOKEN = process.env.PARATRANZ_TOKEN
export const GITHUB_REPO_OWNER = "Eltirosto"
export const GITHUB_REPO_NAME = "Degrees-of-Lewdity-Chinese-Localization"
export const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN
