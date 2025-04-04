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
    },
    category: {
        isString: {
            errorMessage: 'Category has to be a string'
        },
        matches: {
            options: /^(?=(.*[a-zA-Z]){6})[a-zA-Z\s\W]+$/,
            errorMessage: 'Item cannot contain symbols'
        },
        trim: true,
        optional: true
    },
    imagePath: {
        isString: {
            errorMessage: 'Image path must be a string'
        },
        matches: {
            options: /^http:\/\/localhost:3000\/images\/\d+-[a-z0-9ç-]+\.jpg$/i,
            errorMessage: 'Invalid path'
        },
        trim: true,
        optional: true
    },
}