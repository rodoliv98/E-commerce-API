export const deleteProductSchema = {
    item: {
        isString: {
            errorMessage: 'Item has to be a string',
        },
        notEmpty: {
            errorMessage: 'Item cannot be empty'
        },
        matches: {
            options: /^(?=(.*[a-zA-Z]){6})[a-zA-Z\s\W]+$/,
            errorMessage: 'Item cannot contain symbols or numbers'
        },
        trim: true,
    },
}