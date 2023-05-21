// require in caolan forms
const forms = require("forms");
// handy shortcuts
const fields = forms.fields;
const validators = forms.validators;

const createLoginForm = () =>
  forms.create({
    username: fields.string({
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
  });

  module.exports = {createLoginForm}