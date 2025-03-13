export const patchAddressSchema = {
    country: {
        isString: {
            errorMessage: 'Country must be a string',
        },
        optional: true,
        trim: true
    },
    state: {
        isString: {
            errorMessage: 'State must be a string',
        },
        optional: true,
        trim: true
    },
    city: {
        isString: {
            errorMessage: 'City must be a string',
        },
        optional: true,
        trim: true
    },
    street: {
        isString: {
            errorMessage: 'Street must be a string',
        },
        optional: true,
        trim: true
    },
    houseNumber: {
        isInt: {
            min: 1,
            max: 9999,
            errorMessage: 'Houser number must be a int',
        },
        toInt: true,
        optional: true,
        trim: true
    }
}