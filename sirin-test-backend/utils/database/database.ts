import config from '../../src/config/config'

const Pool = require('pg').Pool
import { DbConfig } from '../../interfaces/database'
import { InitDb } from './initDb'

export class Database {
    db: any

    constructor(config: DbConfig) {
        this.connect(config)
    }

    private async connect({ user, host, database, password, port }: DbConfig) {
        this.db = await new Pool({
            user,
            host,
            database,
            password,
            port
        })

        new InitDb(this.db)
        return this.db
    }
}

export class DatabaseManager {
    db: any
    private static instance: DatabaseManager

    constructor(db: any) {
        this.db = db.db
    }

    public static getInstance(): DatabaseManager {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager(config.db)
        }

        return DatabaseManager.instance
    }

    public async insertData(table: string, fields: string, values: string, data: any) {
        await this.db.query(`INSERT INTO ${table}(${fields}) VALUES(${values})`, data)
    }

    public async selectData(table: string, select: string = '*') {
        const rows = await this.db.query(`SELECT ${select} FROM ${table}`)
        return rows.rows
    }

    public async findElement(select: string = '*', table: string, condition_key: string, condition_value: any) {
        const { rows } = await this.db.query(`SELECT ${select} FROM ${table} WHERE ${condition_key} = $1`, [condition_value])
        return rows
    }

    public async deleteElement(select = '*', table: string, condition_key: string, condition_value: any) {
        await this.db.query(`DELETE FROM ${table} WHERE ${condition_key} = $1`, [condition_value])

        return 'Successfully deleted item'
    }

    public async updateElement(table: string, fields: any, condition_key: string, condition_value: any) {
        const keys = Object.keys(fields)
        let lastItem
        const argKeys = Object.keys(fields)
            .map((obj, index) => {
                lastItem = index + 1
                return `${keys[index]} = $${index + 1}`
            })
            .join(', ')

        await this.db.query(`UPDATE ${table} SET ${argKeys} WHERE ${condition_key} = $${lastItem && lastItem + 1}`, [...Object.values(fields), condition_value])
    }
}
