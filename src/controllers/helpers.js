export const badRequest = (body) => ({
    statusCode: 400,
    body,
})

export const Created = (body) => ({
    statusCode: 201,
    body,
})

export const serverError = () => ({
    statusCode: 500,
    body: {
        message: 'Internal server Error',
    },
})

export const ok = (body) => ({
    statusCode: 200,
    body,
})
