/**
 * 提取词典
 * ===================
 * 1.       对 .twee 文件
 * 1.1.     先按照 Passage 作为单元拆开
 * 1.1.1.   对于 Passage [widgets]，再按照 <<widget>><</widget>> 作为单元拆开
 * 1.1.2.
 * ===================
 * 2. 对 .js 文件
 */
import {error} from "./log";

class PickUp {
    parse(filename: string, content: string) {
        if (filename.endsWith(".twee")) {
            return this.parseTwine(filename, content);
        } else if (filename.endsWith(".js")) {
            return this.parseJS(filename, content);
        } else {
            error(`[ERROR] Error from Pickup.parse(), unknown file type: ${filename}`);
            throw new Error(`[Pickup.parse()] Unknown file type: ${filename}`);
        }
    }

    parseTwine(filename: string, content: string) {

    }

    parseJS(filename: string, content: string) {

    }
}