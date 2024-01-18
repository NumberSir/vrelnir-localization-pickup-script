"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const log_1 = require("./log");
class Credits {
    async buildParatranzMembers(projectId = null) {
        const members = await this.getParatranzMembers(projectId);
        return await this.filterScoredParatranzMembers(members);
    }
    async getParatranzMembers(projectId = null) {
        if (!projectId) {
            projectId = consts_1.PARATRANZ_PROJECT_ID;
        }
        const url = `https://paratranz.cn/api/projects/${projectId}/members`;
        const headers = { Authorization: consts_1.PARATRANZ_TOKEN };
        const response = await axios_1.default.get(url, {
            httpsAgent: new https_1.default.Agent({ rejectUnauthorized: false }),
            headers: headers
        }).catch(err => {
            (0, log_1.error)(`[ERROR] in getParatranzMembers() while requesting ${url}!\n`);
            return Promise.reject(err);
        });
        return response.data;
    }
    async filterScoredParatranzMembers(members) {
        let resultMembers = [];
        for (const member of members) {
            if (!member.totalPoints) {
                continue;
            }
            if (member.user.nickname) {
                resultMembers.push(`${member.user.username}(${member.user.nickname})`);
            }
            else {
                resultMembers.push(member.user.username);
            }
        }
        return resultMembers;
    }
    async buildMirahezeMembers() { }
    async buildGitHubIssueMembers() { }
}
async function main() {
    const credits = new Credits();
    const paratranzMembers = await credits.buildParatranzMembers();
    console.log(paratranzMembers);
}
(async () => {
    await main();
})();
//# sourceMappingURL=credits.js.map