export const cartSchema = {
    item: {
        isString: {
            errorMessage: 'Invalid item',
        },
        notEmpty: {
            errorMessage: 'Item cannot be empty'
        },
        matches: {
            options: /^(?=(.*[a-zA-Z]){6})[a-zA-Z\s\W]+$/,
            errorMessage: 'Item cannot contain symbols'
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