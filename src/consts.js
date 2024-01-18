"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GITHUB_ACCESS_TOKEN = exports.GITHUB_REPO_NAME = exports.GITHUB_REPO_OWNER = exports.PARATRANZ_TOKEN = exports.PARATRANZ_PROJECT_ID = exports.DIR_DOL_GAME = exports.DIR_DOL_ROOT = exports.DIR_SRC = exports.DIR_DICT_LOCAL_RAW = exports.DIR_DICT_LOCAL = exports.DIR_DICT_DOWNLOADED_WEBLATE = exports.DIR_DICT_DOWNLOADED_PARATRANZ = exports.DIR_DICT_DOWNLOADED = exports.DIR_DICT = exports.DIR_DATA = exports.DIR_ROOT = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.argv[2]) {
    process.argv[2] = ".";
}
/* PATHS */
exports.DIR_ROOT = path_1.default.resolve(path_1.default.dirname(process.argv[2]));
exports.DIR_DATA = path_1.default.join(exports.DIR_ROOT, "data");
exports.DIR_DICT = path_1.default.join(exports.DIR_DATA, "dict");
exports.DIR_DICT_DOWNLOADED = path_1.default.join(exports.DIR_DICT, "downloaded"); // 下载的已经部分或全部本地化的词典
exports.DIR_DICT_DOWNLOADED_PARATRANZ = path_1.default.join(exports.DIR_DICT_DOWNLOADED, "paratranz"); // 从 paratranz 下载的本地化词典
exports.DIR_DICT_DOWNLOADED_WEBLATE = path_1.default.join(exports.DIR_DICT_DOWNLOADED, "weblate"); // 从 weblate 下载的本地化词典
exports.DIR_DICT_LOCAL = path_1.default.join(exports.DIR_DICT, "local"); // 本地提取的词典
exports.DIR_DICT_LOCAL_RAW = path_1.default.join(exports.DIR_DICT_LOCAL, "raw"); // 未经加工的默认词典
exports.DIR_SRC = path_1.default.join(exports.DIR_ROOT, "src");
exports.DIR_DOL_ROOT = path_1.default.join(exports.DIR_SRC, "modules/degrees-of-lewdity"); // 游戏源代码位置
exports.DIR_DOL_GAME = path_1.default.join(exports.DIR_DOL_ROOT, "game"); // 游戏源代码里绝大部分 twee 和 js 文件位置
/* TOKENS */
exports.PARATRANZ_PROJECT_ID = 4780;
exports.PARATRANZ_TOKEN = process.env.PARATRANZ_TOKEN;
exports.GITHUB_REPO_OWNER = "Eltirosto";
exports.GITHUB_REPO_NAME = "Degrees-of-Lewdity-Chinese-Localization";
exports.GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
//# sourceMappingURL=consts.js.map