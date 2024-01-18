/**
 * https://www.motoslave.net/sugarcube/2/docs
 * ===================
 * 提取词典
 * ===================
 * 1.       对 .twee 文件
 * 1.1.     先按照 Passage 作为单元拆开
 * 1.2.     如果有，按照 <<widget>><</widget>> 作为单元拆开
 * 1.3.     依次向下寻找以下单元：
 * 1.3.1.   如果有，按照 <<if>><<elseif>><<else>><</if>> 作为单元拆开
 * 1.3.2.   如果有，按照 <<switch>><<case>><<default>><</switch>> 作为单元拆开
 * 1.3.3.   如果有，按照 <<cycle>><<option>><<optionsfrom>><</cycle>> 作为单元拆开
 * 1.3.4.   如果有，按照 <<listbox>><<option>><<optionsfrom>><</listbox>> 作为单元拆开
 * 1.3.5.   如果有，按照 <<createaudiogroup>><<track>><</createaudiogroup>> 作为单元拆开
 * 1.3.6.   如果有，按照 <<createplaylist>><<track>><</createplaylist>> 作为单元拆开
 * 1.3.7.   如果有，按照 <<for>><</for>> 作为单元拆开
 * 1.3.8.   如果有，按照 <<replace>><</replace>> 作为单元拆开
 * 1.3.9.   如果有，按照 <<link>><</link>> 作为单元拆开
 * 1.3.10.  如果有，按照 <<capture>><</capture>> 作为单元拆开
 * 1.3.11.  如果有，按照 <<script>><</script>> 作为单元拆开
 * 1.3.12.  如果有，按照 <<nobr>><</nobr>> 作为单元拆开
 * 1.3.13.  如果有，按照 <<silently>><</silently>> 作为单元拆开
 * 1.3.14.  如果有，按照 <<repeat>><</repeat>> 作为单元拆开
 * 1.3.15.  如果有，按照 <<type>><</type>> 作为单元拆开
 * 1.3.16.  如果有，按照 <<button>><</button>> 作为单元拆开
 * 1.3.17.  如果有，按照 <<linkappend>><</linkappend>> 作为单元拆开
 * 1.3.18.  如果有，按照 <<linkprepend>><</linkprepend>> 作为单元拆开
 * 1.3.19.  如果有，按照 <<linkreplace>><</linkreplace>> 作为单元拆开
 * 1.3.20.  如果有，按照 <<append>><</append>> 作为单元拆开
 * 1.3.21.  如果有，按照 <<prepend>><</prepend>> 作为单元拆开
 * 1.3.22.  如果有，按照 <<done>><</done>> 作为单元拆开
 * 1.3.23.  如果有，按照 <<repeat>><</repeat>> 作为单元拆开
 * 1.3.24.  如果有，按照 <<timed>><</timed>> 作为单元拆开
 * ===================
 * 2. 对 .js 文件
 */
import {error} from "./log";

enum MacrosName {
    IF = "if",
    ELSE_IF = "elseif",
    ELSE = "else",
    IF_CLOSE = "/if",

    SWITCH = "switch",
    CASE = "case",
    DEFAULT = "default",
    SWITCH_CLOSE = "/switch",

    FOR = "for",
    FOR_CLOSE = "/for",

    REPLACE = "replace",
    REPLACE_CLOSE = "/replace",

    LINK = "link",
    LINK_CLOSE = "/link"
}

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

    /**
     * 将一个 Passage 拆成小单元
     * @param content
     */
    splitIntoUnits(content: string) {
    }

    parseJS(filename: string, content: string) {

    }
}