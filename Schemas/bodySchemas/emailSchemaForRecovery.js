export const emailForRecovery = {
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
}