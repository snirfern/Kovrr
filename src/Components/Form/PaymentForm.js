const paymentFormFields = [
    {
        name: 'First tName',
        label: 'First name',
        type: 'input',
        validations: [{required: true, type: 'string', min: 3}]

    },
    {
        name: 'Last Name',
        label: 'Last name',
        type: 'input',
        validations: [{required: true, type: 'string', min: 3}]
    },
    {
        name: 'Phone',
        label: 'Phone number',
        type: 'input',
        validations: [
            {
                required: true,
                message: 'Please enter your phone number!',
            },
            {
                pattern: /^\d{10}$/,
                message: 'Please enter a valid 10-digit phone number',
            },
        ]
    },
    {
        name: 'Email',
        label: 'Email',
        type: 'input',
        validations: [{type: 'email', required: true, min: 5}]

    },
]

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export {paymentFormFields,validateMessages}