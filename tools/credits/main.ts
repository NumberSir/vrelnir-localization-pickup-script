import {PARATRANZ_PROJECT_ID, PARATRANZ_TOKEN} from "./consts";
import axios from "axios";
import https from "https";
import {error} from "./log";

interface ParatranzMember {
    id: number
    createdAt: string
    updatedAt: string
    uid: number
    project: number
    permission: number
    approveBy: string | {
        id: number
        username: string
        nickname?: string
        avatar: string
        lastVisit: string
    }
    note: string
    translated: number
    edited: number
    reviewed: number
    user: {
        id: number
        username: string
        nickname?: string
        avatar: string
        lastVisit: string
        isOnline: boolean
    }
    totalPoints: number
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
        const headers = {Authorization: PARATRANZ_TOKEN}
        const response = await axios.get(url, {
            httpsAgent: new https.Agent({rejectUnauthorized: false}),
            headers: headers
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

    async buildMirahezeMembers() {}

    async buildGitHubIssueMembers() {}
}

async function main() {
    const credits = new Credits();
    const paratranzMembers = await credits.buildParatranzMembers();
    console.log(paratranzMembers);
}

(async () => {
    await main();
})();