export const addressSchema = {
    country: {
        isString: {
            errorMessage: 'Country must be a string',
        },
        notEmpty: {
            errorMessage: 'Country must not be empty',
        },
        trim: true
    },
    state: {
        isString: {
            errorMessage: 'State must be a string',
        },
        notEmpty: {
            errorMessage: 'State must not be empty',
        },
        trim: true
    },
    city: {
        isString: {
            errorMessage: 'City must be a string',
        },
        notEmpty: {
            errorMessage: 'City must not be empty',
        },
        trim: true
    },
    street: {
        isString: {
            errorMessage: 'Street must be a string',
        },
        notEmpty: {
            errorMessage: 'Street must not be empty',
        },
        trim: true
    },
    houseNumber: {
        isInt: {
            min: 1,
            max: 9999,
            errorMessage: 'Houser number must be a int',
        },
        toInt: true,
        notEmpty: {
            errorMessage: 'Houser number must not be empty',
        },
        trim: true
    }
}