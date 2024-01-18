import {CoreProcess} from "./core";
import {DIR_DOL_ROOT} from "./consts";

(async () => {
    const core = new CoreProcess();
    const [allPassagesNames, allPassages] = await core.getAllPassages(DIR_DOL_ROOT);
    await core.writeAllPassages(allPassages);
    const allWidgets = await core.getAllWidgets(allPassages);
    await core.writeAllWidgets(allWidgets);
})()