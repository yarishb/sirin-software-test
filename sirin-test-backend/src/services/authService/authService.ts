import { DatabaseManager } from '../../../utils/database/database'
import { Request, Response } from 'express'
import config from '../../config/config'
import { PasswordManager } from '../../../utils/checkers/passwordChecker'
import { IUser, UserPasswordCheck } from '../../../interfaces/user'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

export class AuthService {
    public async register(req: Request, res: Response) {
        try {
            const dbManager: DatabaseManager = DatabaseManager.getInstance()
            const pm = new PasswordManager()
            let { login, password }: { login: string; password: string } = req.body

            if (!login || !password) {
                return res.status(400).json({ msg: 'Введіть всі поля.' })
            }

            const existingUserByLogin: Array<IUser> = await dbManager.findElement('*', 'public.users', 'login', login)

            if (existingUserByLogin.length) {
                return res.status(400).json({ msg: 'Користувач з таким логіном вже існує.' })
            }

            const passwordCheck: UserPasswordCheck = await pm.hashPassword(password)
            if (!passwordCheck.status) {
                return res.status(400).json({ msg: passwordCheck.msg })
            }

            await dbManager.insertData('public.users', 'login, password', '$1, $2', [login, passwordCheck.passwordHash])

            res.send({
                login
            })
        } catch (err) {
            console.log(err)
            return res.status(400).json({ msg: err.message || err.msg })
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const dbManager: DatabaseManager = new DatabaseManager(config.db)

            let { login, password }: { login: string; password: string } = req.body
            if (!login || !password) {
                return res.status(400).json({ msg: 'Введіть всі поля.' })
            }

            const user: Array<IUser> = await dbManager.findElement('*', 'public.users', 'login', login)

            if (!user.length) {
                return res.status(400).json({ msg: 'Користувача з таким логіном не знайдено.' })
            }

            const ifMatch: boolean = await bcrypt.compare(password, user[0].password)
            if (!ifMatch) return res.status(400).json({ msg: 'Неправильні пароль або логін.' })

            const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET)
            const resData = {
                token,
                user: {
                    login: user[0].login
                }
            }

            res.send(resData)
        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    }

    public async getUser(req: Request, res: Response) {
        try {
            const dbManager: DatabaseManager = new DatabaseManager(config.db)

            let decodedJwt: number = jwt_decode(req.headers['x-auth-token']).id

            const usersRes: Array<IUser> = await dbManager.findElement('*', 'public.users', 'id', decodedJwt)

            if (!usersRes.length) {
                return res.status(400).json({ msg: 'Користувача з таким логіном не знайдено.' })
            }

            res.send({
                login: usersRes[0].login
            })
        } catch (err) {
            res.status(500).json({ err: err.message })
        }
    }

    public async validToken(req: Request, res: Response) {
        try {
            const token = req.headers['x-auth-token']
            if (!token) return res.json(false)

            const verified: boolean = jwt.verify(token, process.env.JWT_SECRET)
            if (!verified) return res.json(false)

            return res.json(true)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    }
}
