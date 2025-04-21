export const userLogin = {
    email: {
        isString: {
            errorMessage: 'Email has to be a string'
        },
        notEmpty: {
            errorMessage: 'Email cannot be empty'
        },
        matches: {
            options: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi,
            errorMessage: 'Email invalido'
        },
        trim: true,
    },
    password: {
        isString: {
            errorMessage: 'Password has to be a string'
        },
        notEmpty: {
            errorMessage: 'Password cannot be empty'
        },
        matches: {
            options: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
            errorMessage: 'Senha invalida'
        },
        trim: true,
    }
}