const express = require('express');
const { createLoginForm } = require('../forms/agent/agentLogin');
const { createRegistrationForm } = require('../forms/agent/agentRegister');
const router = express.Router();

const agentLoginForm = createLoginForm()
const agentRegisterForm = createRegistrationForm()

router.get('/', (req, res) => {
    res.render('agent/agent')
});

router.get('/login', (req, res) => {
    res.render('agent/agentLogin', {
        form: agentLoginForm.toHTML()

    })
});

router.get('/register', (req, res) => {
    res.render('agent/agentRegister', {
        form: agentRegisterForm.toHTML()

    })
});

// router.post('/register', (req, res) => {
    


// })

module.exports = router

