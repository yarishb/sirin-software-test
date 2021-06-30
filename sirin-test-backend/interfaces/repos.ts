export interface IRepoGitubRes {
    full_name: string
    owner: {
        login: string
        html_url: string
        avatar_url: string
    }
    html_url: string
    stargazers_count: number
    forks_count: number
    open_issues_count: number
    created_at: string
}

export interface IReposFromDb {
    project_owner: string
    project_owner_url: string
    project_owner_avatar: string
    project_name: string
    project_url: string
    count_of_stars: number
    count_of_forks: number
    count_of_issues: number
    created_at: string
    id?: number
    user_id: number
}
