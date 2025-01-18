export const createProduct = {
    item: {
        isString: {
            errorMessage: 'Item has to be a string',
        },
        notEmpty: {
            errorMessage: 'Item cannot be empty'
        },
        matches: {
            options: /^(?=(.*[a-zA-Z]){6})[a-zA-Z\s]+$/,
            errorMessage: 'Item cannot contain symbols'
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
            errorMessage: 'Quantity has to be a integer',
        },
        toInt: true,
        notEmpty: {
            errorMessage: 'Quantity cannot be empty'
        },
        trim: true,
    }
}