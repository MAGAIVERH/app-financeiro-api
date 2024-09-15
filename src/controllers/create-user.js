import { CreateUserUseCase } from '../user-cases/create-user.js'
import validator from 'validator'
import { Created, badRequest, serverError } from './helpers.js'

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

            const passwordIsValid = params.password.length < 6

            if (passwordIsValid) {
                return badRequest({
                    message: 'Password must be at least 6 characters',
                })
            }

            const emailIsValid = validator.isEmail(params.email)

            if (!emailIsValid) {
                return badRequest({
                    message: 'Invalid Email. Please provide a valid one',
                })
            }

            // Call the use case
            const createUserUseCase = new CreateUserUseCase()

            const createUser = await createUserUseCase.execute(params)

            // Return the response to the user 'status code'
            return Created(createUser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
