import {
    GITHUB_ACCESS_TOKEN,
    GITHUB_REPO_NAME,
    GITHUB_REPO_OWNER,
    PARATRANZ_PROJECT_ID,
    PARATRANZ_TOKEN
} from "./consts";
import axios from "axios";
import https from "https";
import {load as cheerioLoad, AnyNode} from "cheerio";
import {error} from "./log";
import * as fs from "fs";
import {ParatranzMember, GitHubIssueMember} from "./models";
import {promisify} from "util";
import {DIR_OUTPUT} from "./consts";
import * as path from "path";

async function initDirs() {
    await promisify(fs.access)(DIR_OUTPUT).catch(async () => {
        // 不存在就新建
        return await promisify(fs.mkdir)(DIR_OUTPUT, {recursive: true});
    }).catch(err => {
        error(`[ERROR] in initDirs() while initializing ${DIR_OUTPUT}!\n`);
        return Promise.reject(err);
    });
}

class Credits {
    async buildParatranzMembers(projectId: number | null = null) {
        const members = await this.getParatranzMembers(projectId);
        return await this.filterScoredParatranzMembers(members);
    }

    async getParatranzMembers(projectId: number | null = null): Promise<ParatranzMember[]> {
        if (!projectId) {
            projectId = PARATRANZ_PROJECT_ID;
        }
        const url = `https://paratranz.cn/api/projects/${projectId}/members`;
        const headers = {Authorization: PARATRANZ_TOKEN};
        const response = await axios.get(url, {
            httpsAgent: new https.Agent({rejectUnauthorized: false}),
            headers: headers,
            responseType: "json"
        }).catch(err => {
            error(`[ERROR] in getParatranzMembers() while requesting ${url}!\n`);
            return Promise.reject(err);
        })
        return response.data;
    }

    async filterScoredParatranzMembers(members: ParatranzMember[]) {
        let resultMembers: string[] = [];
        for (const member of members) {
            if (!member.totalPoints) {continue;}

            if (member.user.nickname) {
                resultMembers.push(`${member.user.username}(${member.user.nickname})`);
            } else {
                resultMembers.push(member.user.username);
            }
        }
        return resultMembers;
    }

    async buildMirahezeMembers(limit: number = 500) {
        const membersHTML = await this.getMirahezeMembers(limit);
        return await this.filterScoredMirahezeMembers(membersHTML);
    }

    async getMirahezeMembers(limit: number = 500): Promise<string> {
        const url: string = `https://degreesoflewditycn.miraheze.org/wiki/${encodeURI("特殊:用户列表")}?editsOnly=1&wpFormIdentifier=mw-listusers-form&limit=${limit}`;
        const response = await axios.get(url, {
            responseType: "text"
        }).catch(err => {
            error(`[ERROR] in getMirahezeMembers() while requesting ${url}!\n`);
            return Promise.reject(err);
        })

        return response.data;
    }

    async filterScoredMirahezeMembers(membersHTML: string) {
        const html = cheerioLoad(membersHTML);
        const members: string[] = [];

        const result = html('bdi').contents();
        result.each((_, el: AnyNode) => {
            if (el.type === "text") {
                members.push(el.data);
            }
        })
        return members;
    }

    async buildGitHubIssueMembers(owner: string | null = null, repo: string | null = null, perPage: number = 100, pages: number = 2) {
        const members = await this.getGitHubIssueMembers(owner, repo, perPage, pages);
        return await this.filterGitHubIssueMembers(members);
    }

    async getGitHubIssueMembers(owner: string | null = null, repo: string | null = null, perPage: number = 100, pages: number = 2) {
        if (!owner) {
            owner = GITHUB_REPO_OWNER;
        }
        if (!repo) {
            repo = GITHUB_REPO_NAME;
        }

        const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
        const headers = {Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`};

        let members: GitHubIssueMember[] = [];
        for (let page = 1; page <= pages; page++) {
            const currentUrl = `${url}?state=all&per_page=${perPage}&page=${page}`
            const response = await axios.get(currentUrl, {
                httpsAgent: new https.Agent({rejectUnauthorized: false}),
                headers: headers,
                responseType: "json"
            }).catch(err => {
                error(`[ERROR] in getGitHubIssueMembers() while requesting ${currentUrl}!\n`);
                return Promise.reject(err);
            })
            members = members.concat(response.data);
        }
        return [...new Set(members)];
    }

    async filterGitHubIssueMembers(members: GitHubIssueMember[]) {
        let result: string[] = [];
        for (const member of members) {
            result.push(member.user.login);
        }
        return [...new Set(result)];
    }
}

async function main() {
    await initDirs();
    const credits = new Credits();
    const paratranzMembers = await credits.buildParatranzMembers();
    const mirahezeMembers = await credits.buildMirahezeMembers();
    const gitHubMembers = await credits.buildGitHubIssueMembers();

    const paratranzMembersText = paratranzMembers.join("\n- ");
    const mirahezeMembersText = mirahezeMembers.join("\n- ");
    const gitHubMembersText = gitHubMembers.join("\n- ");

    const date = new Date();
    const currentDay = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`;
    const text = `## 欲都孤儿 贡献者名单\n> ${currentDay}\n### 为汉化做出过贡献的诸位（排名不分先后）：\n<details>\n<summary>点击展开</summary>\n\n- ${paratranzMembersText}\n\n</details>\n\n### 为建设中文维基提供过贡献的诸位（排名不分先后）：\n<details>\n<summary>点击展开</summary>\n\n- ${mirahezeMembersText}\n\n</details>\n\n### 为改进汉化内容提供过贡献的诸位（排名不分先后）：\n<details>\n<summary>点击展开</summary>\n\n- ${gitHubMembersText}\n\n</details>\n\n`
    await promisify(fs.writeFile)(path.join(DIR_OUTPUT, "CREDITS.md"), text).catch(async (err) => {
        error("[ERROR] in credits() while writing in CREDITS.md!\n");
        return Promise.reject(err);
    })

}

(async () => {
    await main();
})();