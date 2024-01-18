export interface ParatranzMember {
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

export interface GitHubIssueMember {
    url: string
    repository_url: string
    labels_url: string
    comments_url: string
    events_url: string
    html_url: string
    id: number
    node_id: string
    number: number
    title: string
    user: {
        login: string
        id: number
        node_id: string
        avatar_url: string
        gravatar_id: string
        url: string
        html_url: string
        followers_url: string
        following_url: string
        gists_url: string
        starred_url: string
        subscriptions_url: string
        organizations_url: string
        repos_url: string
        events_url: string
        received_events_url: string
        type: string
        site_admin: boolean
    }
    labels: object[]
    state: string
    locked: boolean
    assignee: any | null
    assignees: any[]
    milestone: any | null
    comments: number
    created_at: string
    updated_at: string
    closed_at: string | null
    author_association: string
    active_lock_reason: any | null
    body: string
    reactions: {
        url: string
        total_count: number
        "+1": number
        "-1": number
        laugh: number
        hooray: number
        confused: number
        heart: number
        rocket: number
        eyes: number
    }
    timeline_url: string
    performed_via_github_app: any | null
    state_reason: any | null
}