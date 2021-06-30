import dotenv from 'dotenv'
import { Database } from '../../utils/database/database'
import { DbConfig } from '../../interfaces/database'
import { Server, JWT, Config } from '../../interfaces/config'

dotenv.config()

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost'
const SERVER_PORT = process.env.SERVER_PORT || 5000

const SERVER: Server = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
}

const jwt: JWT = {
    SECRET_KEY: process.env.JWT_SECRET
}

const db_config: DbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

const db: Database = new Database(db_config)

export const reqConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const config: Config = {
    server: SERVER,
    jwt,
    db,
    basicGithubLink: 'https://api.github.com/'
}

export default config
