import { checkSchema } from 'express-validator';

export const paymentSchema = {
    'person.fullName': {
        isString: {
            errorMessage: 'Invalid name',
        },
        notEmpty: {
            errorMessage: 'Name cannot be empty',
        },
        trim: true,
    },
    'person.cpf': {
        isString: {
            errorMessage: 'Invalid CPF',
        },
        notEmpty: {
            errorMessage: 'CPF cannot be empty',
        },
        matches: {
            options: /^\d{11}$/,
            errorMessage: 'Invalid CPF format',
        },
        trim: true,
    },
    'person.birthDate': {
        isString: {
            errorMessage: 'Invalid birth date',
        },
        notEmpty: {
            errorMessage: 'Birth date cannot be empty',
        },
        matches: {
            options: /^\d{2}-\d{2}-\d{4}$/,
            errorMessage: 'Birth date must be in DD-MM-YYYY format',
        },
        trim: true,
    },
    'person.address.country': {
        isString: {
            errorMessage: 'Invalid country',
        },
        notEmpty: {
            errorMessage: 'Country cannot be empty',
        },
        trim: true,
    },
    'person.address.state': {
        isString: {
            errorMessage: 'Invalid state',
        },
        notEmpty: {
            errorMessage: 'State cannot be empty',
        },
        trim: true,
    },
    'person.address.city': {
        isString: {
            errorMessage: 'Invalid city',
        },
        notEmpty: {
            errorMessage: 'City cannot be empty',
        },
        trim: true,
    },
    'person.address.street': {
        isString: {
            errorMessage: 'Invalid street',
        },
        notEmpty: {
            errorMessage: 'Street cannot be empty',
        },
        trim: true,
    },
    'person.address.houseNumber': {
        isInt: {
            errorMessage: 'Invalid house number',
        },
        notEmpty: {
            errorMessage: 'House number cannot be empty',
        },
        toInt: true,
    },
    card: {
        isString: {
            errorMessage: 'Invalid card',
        },
        notEmpty: {
            errorMessage: 'Card cannot be empty',
        },
        matches: {
            options: /5[1-5][0-9]{14}/,
            errorMessage: 'Invalid card number',
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
            options: [['BRL', 'USD']],
            errorMessage: 'Choose between BRL and USD',
        },
    },
};









/*export const paymentSchema = {
    person: {
        fullName: {
            isString: {
                errorMessage: 'Invalid name'
            },
            notEmpty: {
                errorMessage: 'Name cannot be invalid'
            },
            trim: true,
        },
        cpf: {
            isString: {
                errorMessage: 'Invalid CPF'
            },
            notEmpty: {
                errorMessage: 'CPF cannot be empty'
            },
            matches: {
                options: /^\d{11}$/,
                errorMessage: 'Invalid CPF format',
            },
            trim: true
        },
        birthDate: {
            isString: {
                errorMessage: 'Invalid birth date'
            },
            notEmpty: {
                errorMessage: 'Birth date cannot be empty'
            },
            matches: {
                options: /^\d{2}-\d{2}-\d{4}$/,
                errorMessage: 'Birth date must be in DD-MM-YYYY format',
            },
            trim: true
        },
        address: {
            country: {
                isString: {
                    errorMessage: 'Invalid country'
                },
                notEmpty: {
                    errorMessage: 'Country cannot be empty'
                },
                trim: true
            },
            state: {
                isString: {
                    errorMessage: 'Invalid state'
                },
                notEmpty: {
                    errorMessage: 'State cannot be empty'
                },
                trim: true
            },
            city: {
                isString: {
                    errorMessage: 'Invalid city'
                },
                notEmpty: {
                    errorMessage: 'City cannot be empty'
                },
                trim: true
            },
            street: {
                isString: {
                    errorMessage: 'Invalid street'
                },
                notEmpty: {
                    errorMessage: 'Street cannot be empty'
                },
                trim: true
            },
            houseNumber: {
                isInt: {
                    errorMessage: 'Invalid house number'
                },
                toInt: true,
                notEmpty: {
                    errorMessage: 'Number cannot be empty'
                },
                trim: true
            }
        }
    },
    card: {
        isString: {
            errorMessage: 'Invalid card'
        },
        notEmpty: {
            errorMessage: 'Card cannot be empty'
        },
        matches: {
            options: /5[1-5][0-9]{14}/,
            errorMessage: 'Invalid card number'
        },
        trim: true,
    },
    currency: {
        isString: {
            errorMessage: 'Chose a valid currency'
        },
        notEmpty: {
            errorMessage: 'Currency cannot be empty'
        },
        isIn: {
            options: [['BRL', 'USD']],
            errorMessage: 'Chose between BRL and USD'
        }
    }
}*/