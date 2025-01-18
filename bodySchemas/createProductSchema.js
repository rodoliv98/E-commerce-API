export const createProduct = {
    item: {
        isString: {
            errorMessage: 'Item has to be a string',
        },
        notEmpty: {
            errorMessage: 'Item cannot be empty'
        },
        matches: {
            options: /^(?=(.*[a-zA-Z]){6})[a-zA-Z]+$/,
            errorMessage: 'Item cannot contain symbols or spaces'
        },
        trim: true,
    },
    price: {
        isInt: {
            errorMessage: 'Price has to be a integer',
        },
        toInt: true,
        notEmpty: {
            errorMessage: 'Price cannot be empty'
        },
        trim: true,
    },
    quantity: {
        isInt: {
            min: 1,
            max: 9999,
            errorMessage: 'Quantity has to be a integer',
        },
        toInt: true,
        notEmpty: {
            errorMessage: 'Quantity cannot be empty'
        },
        trim: true,
    }
}