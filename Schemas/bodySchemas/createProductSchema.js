export const createProduct = {
    item: {
        isString: {
            errorMessage: 'Item has to be a string',
        },
        notEmpty: {
            errorMessage: 'Item cannot be empty'
        },
        matches: {
            options: /^(?=.{1,50}$)[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
            errorMessage: 'Item cannot contain symbols or numbers'
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
    },
    imagePath: {
        isString: {
            errorMessage: 'Image path must be a string'
        },
        notEmpty: {
            errorMessage: 'Path needed'
        },
        matches: {
            options: /^http:\/\/localhost:3000\/images\/\d+-[a-z0-9ç-]+\.jpg$/i,
            errorMessage: 'Invalid path'
        },
        trim: true
    },
    category: {
        isString: {
            errorMessage: 'Category must be a string'
        },
        notEmpty: {
            errorMessage: 'Category is needed'
        },
        matches: {
            options: /^(?=.{1,30}$)[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
            errorMessage: 'Category cannot contain symbols or numbers'
        },
        trim: true
    }
}