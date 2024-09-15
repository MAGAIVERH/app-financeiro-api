export const badRequest = (body) => {
    return {
        statusCode: 400,
        body,
    }
}

export const Created = (body) => {
    return {
        statusCode: 201,
        body,
    }
}

export const serverError = () => {
    return {
        statusCode: 500,
        body: {
            message: 'Internal serverError',
        },
    }
}
