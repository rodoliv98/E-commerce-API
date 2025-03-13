export const updateProduct = {
    item: {
        isString: {
            errorMessage: 'Item has to be a string',
        },
        matches: {
            options: /^(?=(.*[a-zA-Z]){6})[a-zA-Z\s\W]+$/,
            errorMessage: 'Item cannot contain symbols'
        },
        trim: true,
        optional: true
    },
    price: {
        isInt: {
            errorMessage: 'Price has to be a integer',
        },
        toInt: true,
        trim: true,
        optional: true
    },
    quantity: {
        isInt: {
            min: 1,
            errorMessage: 'Quantity has to be a integer',
        },
        toInt: true,
        trim: true,
        optional: true
    }
}