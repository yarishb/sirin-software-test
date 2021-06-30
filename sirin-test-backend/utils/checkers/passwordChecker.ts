import { UserPasswordCheck } from '../../interfaces/user'

const bcrypt = require('bcryptjs')

export class PasswordManager {
    private passwordChecker(password: string) {
        return new Promise((resolve, reject) => {
            let msg: string | undefined = undefined
            const numericRegex: RegExp = new RegExp('(?=.*[0-9])')

            if (password.length < 5) {
                msg = 'Пароль повинен містити не менше 5 знаків'
            }

            if (!numericRegex.test(password)) {
                msg = 'Пароль повинен містити числа числа.'
            }

            if (msg) {
                return reject(msg)
            }

            return resolve(true)
        })
    }

    public hashPassword(password: string) {
        return new Promise<UserPasswordCheck>((resolve, reject) => {
            this.passwordChecker(password)
                .then(async () => {
                    const salt: string = await bcrypt.genSalt()
                    const passwordHash = await bcrypt.hash(password, salt)
                    return resolve({
                        status: true,
                        passwordHash,
                        msg: undefined
                    })
                })
                .catch((msg: string) => {
                    return reject({
                        status: false,
                        passwordHash: undefined,
                        msg
                    })
                })
        })
    }
}
