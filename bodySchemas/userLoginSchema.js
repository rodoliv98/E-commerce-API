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
            errorMessage: 'Invalid email'
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
            errorMessage: 'Invalid password'
        },
        trim: true,
    }
}