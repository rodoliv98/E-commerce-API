export const passwordChange = {
    password: {
        isString: {
            errorMessage: 'Password has to be a string'
        },
        notEmpty: {
            errorMessage: 'Password cannot be empty'
        },
        matches: {
            options: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
            errorMessage: 'Weak or invalid password'
        },
        trim: true,
    },
}