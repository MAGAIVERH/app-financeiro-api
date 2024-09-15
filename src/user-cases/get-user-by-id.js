export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByIdRepository = new GetUserByIdUseCase()

        const user = await getUserByIdRepository.execute(userId)

        return user
    }
}
