import { Request, Response } from 'express'
import Axios from 'axios'
import config, { reqConfig } from '../../config/config'
import { DatabaseManager } from '../../../utils/database/database'
import { IRepoGitubRes, IReposFromDb } from '../../../interfaces/repos'

const jwt_decode = require('jwt-decode')

export class ReposService {
    helper: ReposHelper
    constructor() {
        this.helper = new ReposHelper()
    }

    public async getUserRepos(req: Request, res: Response) {
        try {
            const decodedJwt: number = jwt_decode(req.headers['x-auth-token']).id
            res.send(await this.helper.getAllRepos(decodedJwt))
        } catch (err) {
            res.status(400).json({ msg: err.message || err.msg })
        }
    }

    public async addRepo(req: Request, res: Response) {
        try {
            const { repoName } = req.body
            const { dbManager, userId } = await this.helper.getInitialTools(req.headers['x-auth-token'])

            const repositoryData: IRepoGitubRes = await this.helper.getRepoDataFromGhAPI(repoName)
            const { full_name, owner, html_url, stargazers_count, open_issues_count, forks_count, created_at }: IRepoGitubRes = repositoryData

            await dbManager.insertData(
                'public.repos',
                'project_name, user_id, project_owner, project_owner_avatar, project_owner_url ,project_url, count_of_stars, count_of_forks, count_of_issues, created_at',
                '$1, $2, $3, $4, $5, $6, $7, $8, $9, $10',
                [full_name, userId, owner.login, owner.avatar_url, owner.html_url, html_url, stargazers_count, forks_count, open_issues_count, created_at]
            )

            res.send(await this.helper.getAllRepos(userId))
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: err.message || err.msg })
        }
    }

    public async deleteRepo(req: Request, res: Response) {
        try {
            const { repoId } = req.query
            const { dbManager, userId } = await this.helper.getInitialTools(req.headers['x-auth-token'])

            if (this.helper.repoExistsInUser(userId, repoId)) {
                await dbManager.deleteElement('*', 'public.repos', 'id', repoId)
            } else {
                return res.send(false)
            }

            res.send(await this.helper.getAllRepos(userId))
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: err.message || err.msg })
        }
    }

    //update repo using form and user input
    //it can be made using decorator, but I decided to keep code in one style
    public async updateRepoToUserInput(req: Request, res: Response) {
        try {
            const { repoData } = req.body
            const { dbManager, userId } = await this.helper.getInitialTools(req.headers['x-auth-token'])

            await dbManager.updateElement('public.repos', repoData, 'id', repoData.id)
            res.send(await this.helper.getAllRepos(userId))
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: err.message || err.msg })
        }
    }

    //update repo via actualizing data from api
    public async updateRepoToNewDataFromAPI(req: Request, res: Response) {
        try {
            const { repoData }: { repoData: IReposFromDb } = req.body
            const { dbManager, userId } = await this.helper.getInitialTools(req.headers['x-auth-token'])

            const repoDataRes = await this.helper.getRepoDataFromGhAPI(repoData.project_name)

            const updatedRepo: IReposFromDb = {
                project_owner: repoDataRes.owner.login,
                project_owner_url: repoDataRes.owner.html_url,
                project_owner_avatar: repoDataRes.owner.avatar_url,
                project_name: repoDataRes.full_name,
                project_url: repoDataRes.html_url,
                count_of_issues: repoDataRes.open_issues_count,
                count_of_forks: repoDataRes.forks_count,
                count_of_stars: repoDataRes.stargazers_count,
                created_at: repoDataRes.created_at,
                user_id: userId
            }

            dbManager.updateElement('public.repos', updatedRepo, 'id', repoData.id)
            res.send(await this.helper.getAllRepos(userId))
        } catch (err) {
            console.log(err)
            res.status(400).json({ msg: err.message || err.msg })
        }
    }
}

class ReposHelper {
    public async getAllRepos(userId: number): Promise<Array<IReposFromDb>> {
        const dbManager: DatabaseManager = DatabaseManager.getInstance()

        const rows = await dbManager.findElement('*', 'public.repos', 'user_id', userId)
        return rows
    }

    public async repoExistsInUser(userId: number, repoId: any): Promise<boolean> {
        const dbManager: DatabaseManager = DatabaseManager.getInstance()

        const userRepos = await dbManager.findElement('*', 'public.repos', 'user_id', userId)

        const repoExists = userRepos.find((el: IReposFromDb) => el.id == +repoId)
        return repoExists
    }

    public async getRepoDataFromGhAPI(repoName: string): Promise<IRepoGitubRes> {
        const repoData = await Axios.get(`${config.basicGithubLink}repos/${repoName}`, reqConfig)
        return repoData.data
    }

    public async getInitialTools(token: string | string[] | undefined) {
        const dbManager: DatabaseManager = DatabaseManager.getInstance()
        const decodedJwt: number = jwt_decode(token).id

        return { dbManager, userId: decodedJwt }
    }
}
