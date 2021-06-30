import { Database } from '../utils/database/database'

export interface Server {
    hostname: string
    port: number | string
}

export interface JWT {
    SECRET_KEY: string | undefined
}

export interface Config {
    server: Server
    jwt: JWT
    db: Database
    basicGithubLink: string
}
