export interface IUser {
    id: number
    login: string
    password: string
}

export interface UserPasswordCheck {
    status: boolean
    passwordHash: string | undefined
    msg: string | undefined
}
