const emailRegex =/(.+)@(.+){2,}\.(.+){2,}/
const paymentFormFields = [
    {
        name: 'First Name',
        label: 'First name',
        type: 'input',
        validations: [
            {required: true, min: 3},
            {pattern: /^[a-zA-Z]{3,}$/, message: 'Please enter letters only, min 3'}
        ],

        validate: v => /^[a-zA-Z]{3,}$/.test(v)


    },
    {
        name: 'Last Name',
        label: 'Last name',
        type: 'input',
        validations: [
            {required: true, min: 3},
            {pattern: /^[a-zA-Z]{3,}$/, message: 'Please enter letters only, min 3'}
        ],
        validate: v => /^[a-zA-Z]{3,}$/.test(v)

    },
    {
        name: 'Phone',
        label: 'Phone number',
        type: 'input',
        validations: [
            {required: true, message: 'Please enter your phone number!',},
            {pattern: /^\d{10,}$/, message: 'Please enter a valid 10-digit phone number'},
        ],
        validate: v => {
            return /^\d{10,}$/.test(v)
        }

    },
    {
        name: 'Email',
        label: 'Email',
        type: 'input',
        validations: [
            {type: 'email', required: true, min: 5},


        ],
        validate: v => {
            return emailRegex.test(v)

        }


    },
]

const validateMessages = {
    // eslint-disable-next-line
    required: '${label} is required!',

    types: {
        // eslint-disable-next-line
        email: '${label} is not a valid email!',
        // eslint-disable-next-line
        number: '${label} is not a valid number!',
        // eslint-disable-next-line
        input: '${label} is not a valid number!',
    },
    number: {
        // eslint-disable-next-line
        range: '${label} must be between ${min} and ${max}',
    },
};

export {paymentFormFields, validateMessages}