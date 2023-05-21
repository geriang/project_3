// require in caolan forms
const forms = require("forms");
// handy shortcuts
const fields = forms.fields;
const validators = forms.validators;


const createRegistrationForm = () =>
    forms.create({
        username: fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"],
            },
        }),
        email: fields.email({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"],
            },
        }),
        password: fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"],
            },
        }),
        confirm_password: fields.password({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ["form-label"],
            },
            validators: [validators.matchField("password")],
        }),
    });

module.exports = { createRegistrationForm }