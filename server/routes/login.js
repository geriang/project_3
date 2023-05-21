const express = require('express');
const router = express.Router();
const { createLoginForm } = require('../forms/user/userLogin');
const { verify } = require('../dal/userDAL')

const loginForm = createLoginForm()

router.get('/', (req, res) => {
    res.render('landing/login', {
        form: loginForm.toHTML()


    })
});

router.post('/', (req, res) => {

    loginForm.handle(req, {
        success: async (form) => {

            const user = await verify(form.data.username, form.data.password);
            console.log(user, "user details")

            if (!user) {
                req.flash("error", "Invalid credentials");
                // req.session.save(function (err) {
                //     if (err) {
                //         console.log(err)
                //     }
                //     return res.redirect("/login");
                // })
                return req.session.save(() => {
                    res.redirect('login');
                })
               
            }

            // add to the session that login succeeded
            req.session.user = {
                id: user.get("id"),
                username: user.get("username"),
                email: user.get("email"),
            };

            console.log("user should be in session", req.session.user)

            req.flash("success", "Welcome back, " + user.get("username"));
            req.session.save(() => {
                res.redirect("/vendor/dashboard")
            });
            // res.redirect('/vendor/dashboard')


            //   empty: res.renderForm("/login"),
            //   error: res.renderForm("/login"),



        }
    });
});

module.exports = router