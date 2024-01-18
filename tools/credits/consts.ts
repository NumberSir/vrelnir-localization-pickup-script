import dotenv from 'dotenv';
import path from "path";

if (!process.argv[2]) {
    process.argv[2] = "."
}

dotenv.config()

/* TOKENS */
// sourcery skip: use-object-destructuring
export const DIR_ROOT = path.resolve(path.dirname(process.argv[2]));
export const DIR_OUTPUT = path.join(DIR_ROOT, "output")  // 一些输出的文件存放在这里
export const PARATRANZ_PROJECT_ID = 4780
export const PARATRANZ_TOKEN = process.env.PARATRANZ_TOKEN
export const GITHUB_REPO_OWNER = "Eltirosto"
export const GITHUB_REPO_NAME = "Degrees-of-Lewdity-Chinese-Localization"
export const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN
