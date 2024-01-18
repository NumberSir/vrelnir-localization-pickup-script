"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GITHUB_ACCESS_TOKEN = exports.GITHUB_REPO_NAME = exports.GITHUB_REPO_OWNER = exports.PARATRANZ_TOKEN = exports.PARATRANZ_PROJECT_ID = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/* TOKENS */
exports.PARATRANZ_PROJECT_ID = 4780;
exports.PARATRANZ_TOKEN = process.env.PARATRANZ_TOKEN;
exports.GITHUB_REPO_OWNER = "Eltirosto";
exports.GITHUB_REPO_NAME = "Degrees-of-Lewdity-Chinese-Localization";
exports.GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
//# sourceMappingURL=consts.js.map