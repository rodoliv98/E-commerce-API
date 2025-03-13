export const patchUserProfile = {
    fullName: {
        isString: {
            errorMessage: 'Full name must be a string',
        },
        matches: {
            options: /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/,
            errorMessage: 'Invalid full name'
        },
        trim: true,
        optional: true
    },
    cpf: {
        isString: {
            errorMessage: 'Cpf must be a string',
        },
        matches: {
            options: /^\d{11}$/,
            errorMessage: 'Invalid CPF format',
        },
        trim: true,
        optional: true
    },
    birthDate: {
        isString: {
            errorMessage: 'Invalid birth date',
        },
        matches: {
            options: /^\d{2}-\d{2}-\d{4}$/,
            errorMessage: 'Birth date must be in DD-MM-YYYY format',
        },
        trim: true,
        optional: true
    }
}