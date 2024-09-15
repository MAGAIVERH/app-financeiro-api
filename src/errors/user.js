export class EmailAlreadyInUseError extends Error {
    constructor(email) {
        super(`This e-mail ${email} is already in use.`)
        this.name = 'EmailAlreadyInUseError'
    }
}
