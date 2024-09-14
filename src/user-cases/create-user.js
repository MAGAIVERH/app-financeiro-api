import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user'

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: Check if email is already in use
        // Generate user ID
        const userId = uuidv4()

        // Encrypt the password
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

        // insert the user into the data block
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // Call the repository
        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createUser = await postgresCreateUserRepository.execute(user)

        return createUser
    }
}
