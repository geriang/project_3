const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    res.render('vendor/dashboard')
});

module.exports = router
