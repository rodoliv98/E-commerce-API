export const cartSchema = {
    productId: {
        isString: {
            errorMessage: 'ID must be a string',
        },
        notEmpty: {
            errorMessage: 'ID must not be empty',
        },
        matches: {
            options: /^[a-f\d]{24}$/i,
            errorMessage: 'ID must be a valid ObjectId'
        },
        trim: true
    }
}