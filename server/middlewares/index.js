const jwt = require('jsonwebtoken')


// for session
const checkIfAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        req.flash("error", "please log in");
        res.redirect('/');
    }
};

const checkIfAuthJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("check if authenticated JWT console log req.headers.authorization",authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, function (err, payload) {
            if (err) {
                console.log('JWT verification error:', err);
                return res.sendStatus(403);
            }
            req.user = payload;
            next()
        })
    } else {
        res.sendStatus(403);
    }
}

module.exports = { checkIfAuth, checkIfAuthJWT };