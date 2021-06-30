export class InitDb {
    db: any
    constructor(db: any) {
        this.db = db
        this.createUsersTable().then(() => {
            this.createReposTable()
        })
    }

    public async createUsersTable() {
        await this.db.query('CREATE TABLE IF NOT EXISTS public.users (id serial,login character varying NOT NULL,password character varying NOT NULL, PRIMARY KEY (id));')
    }

    public async createReposTable() {
        await this.db.query(
            'CREATE TABLE IF NOT EXISTS public.repos\n' +
                '(' +
                '    project_owner character varying NOT NULL,' +
                '    project_owner_avatar character varying NOT NULL, ' +
                '    project_owner_url character varying NOT NULL,' +
                '    id serial,' +
                '    user_id integer NOT NULL,' +
                '    project_name character varying NOT NULL,' +
                '    project_url character varying NOT NULL,' +
                '    count_of_stars integer,' +
                '    count_of_forks integer,' +
                '    count_of_issues integer,' +
                '    created_at timestamp without time zone,' +
                '    PRIMARY KEY (id),' +
                '    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE' +
                ');'
        )
    }
}
