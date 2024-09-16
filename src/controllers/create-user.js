import { CreateUserUseCase } from '../user-cases/create-user.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    EmailIsAlreadyInUseResponse,
    InvalidPasswordResponse,
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    Created,
    badRequest,
    serverError,
} from './helpers/index.js'

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            // Validate the request : 'required fields, password length and email'
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]
            for (const field of requiredFields) {
                if (!params[field] || params[field].length === 0) {
                    return badRequest({ message: `Missing param: ${field}` })
                }
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password)

            if (!passwordIsValid) {
                return InvalidPasswordResponse()
            }

            const emailIsValid = checkIfEmailIsValid(params.email)

            if (!emailIsValid) {
                return EmailIsAlreadyInUseResponse()
            }

            // Call the use case
            const createUserUseCase = new CreateUserUseCase()

            const createUser = await createUserUseCase.execute(params)

            // Return the response to the user 'status code'
            return Created(createUser)
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            console.error(error)
            return serverError()
        }
    }
}
