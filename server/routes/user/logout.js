const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    if (req.session.passport) {
        req.session.passport = null;
        res.send("logged out")
    };
});

module.exports = router;