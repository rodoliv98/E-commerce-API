export const tokenSchema = {
    token: {
        in: ['query'],
        exists: {
            errorMessage: 'You must have a token',
        },
        isString: {
            errorMessage: 'Token must be a string',
        },
        notEmpty: {
            errorMessage: 'Token cannot be empty'
        }
    }
}