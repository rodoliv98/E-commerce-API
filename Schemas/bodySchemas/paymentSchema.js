export const paymentSchema = {
    fullName: {
        isString: {
            errorMessage: 'Invalid name',
        },
        notEmpty: {
            errorMessage: 'Name cannot be empty',
        },
        trim: true,
    },
    cpf: {
        isString: {
            errorMessage: 'Invalid CPF',
        },
        notEmpty: {
            errorMessage: 'CPF cannot be empty',
        },
        matches: {
            options: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            errorMessage: 'Invalid CPF',
        },
        trim: true,
    },
    birthDate: {
        isString: {
            errorMessage: 'Invalid birth date',
        },
        notEmpty: {
            errorMessage: 'Birth date cannot be empty',
        },
        matches: {
            options: /^\d{2}\/\d{2}\/\d{4}$/,
            errorMessage: 'Invalid birth date',
        },
        trim: true,
    },
    country: {
        isString: {
            errorMessage: 'Invalid country',
        },
        notEmpty: {
            errorMessage: 'Country cannot be empty',
        },
        trim: true,
    },
    state: {
        isString: {
            errorMessage: 'Invalid state',
        },
        notEmpty: {
            errorMessage: 'State cannot be empty',
        },
        trim: true,
    },
    city: {
        isString: {
            errorMessage: 'Invalid city',
        },
        notEmpty: {
            errorMessage: 'City cannot be empty',
        },
        trim: true,
    },
    street: {
        isString: {
            errorMessage: 'Invalid street',
        },
        notEmpty: {
            errorMessage: 'Street cannot be empty',
        },
        trim: true,
    },
    houseNumber: {
        isString: {
            errorMessage: 'Invalid house number',
        },
        notEmpty: {
            errorMessage: 'House number cannot be empty',
        },
        trim: true,
    },
    cep: {
        isString: {
            errorMessage: 'Invalid CEP',
        },
        notEmpty: {
            errorMessage: 'CEP cannot be empty',
        },
        matches: {
            options: /^\d{5}-\d{3}$/,
            errorMessage: 'Invalid CEP',
        },
        trim: true,
    },
    cardNumber: {
        isString: {
            errorMessage: 'Invalid card',
        },
        notEmpty: {
            errorMessage: 'Card cannot be empty',
        },
        matches: {
            options: /^\d{4}\.\d{4}\.\d{4}\.\d{4}$/,
            errorMessage: 'Invalid card number',
        },
        trim: true,
    },
    total: {
        isNumeric: {
            errorMessage: 'Invalid total',
        },
        notEmpty: {
            errorMessage: 'Total cannot be empty',
        },
        trim: true,
    },
    currency: {
        isString: {
            errorMessage: 'Choose a valid currency',
        },
        notEmpty: {
            errorMessage: 'Currency cannot be empty',
        },
        isIn: {
            options: [['BRL', 'USD', 'EUR']],
            errorMessage: 'Choose between BRL and USD',
        },
    },
    cart: {
        isArray: {
            errorMessage: 'Cart must be an array',
        },
        notEmpty: {
            errorMessage: 'Cart cannot be empty',
        },
    },
};