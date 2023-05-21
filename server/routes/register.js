const express = require('express');
const router = express.Router();
const { createRegistrationForm } = require('../forms/user/userRegister');
const UserService = require('../services/userService')

const registrationForm = createRegistrationForm()

const UserSvc = new UserService()

router.get('/', (req, res) => {
    res.render('landing/register', {

        form: registrationForm.toHTML()
    });

});

router.post('/', (req, res) => {
    registrationForm.handle(req, {
        success: async (form) => {
            const checkExistingUser = await UserSvc.verifyUserByEmail(form.data.email)
            if (checkExistingUser){
                req.flash("error", "user already exists")
                req.session.save(() => {
                 res.redirect("/login")
                });
        
            }else{
            await UserSvc.createNewUser(form.data.username, form.data.password, form.data.email);
            req.flash("success", "User signed up successfully");
            req.session.save(() => {
                res.redirect("/login")
            });
        }
        }
    })



})

module.exports = router