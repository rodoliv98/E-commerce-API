export const createUserProfile = {
    fullName: {
        isString: {
            errorMessage: 'Full name must be a string',
        },
        notEmpty: {
            errorMessage: 'Full name is required',
        },
        matches: {
            options: /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/,
            errorMessage: 'Invalid full name'
        },
        trim: true,
    },
    cpf: {
        isString: {
            errorMessage: 'Cpf must be a string',
        },
        notEmpty: {
            errorMessage: 'Cpf is required',
        },
        matches: {
            options: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            errorMessage: 'Invalid CPF format',
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
            errorMessage: 'Birth date must be in DD-MM-YYYY format',
        },
        trim: true,
    }
}