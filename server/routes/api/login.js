const express = require('express');
const router = express.Router();
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { checkIfAuthJWT } = require('../../middlewares');
// const { getBlackListedToken } = require('../../dal/rftokenDAL');
const generateToken = require('../../utils/generateToken');
const UserService = require('../../services/userService');
const BlacklistedTokenService = require('../../services/blacklistedTokenService')
// const getHashedPassword = require('./../../utils/hashPassword')

const UserSvc = new UserService();
const TokenSvc = new BlacklistedTokenService();
// const generateAccessToken = (user) => {
//   // sign takes in 3 argument
//   // arg 1: jwt payload - what information you want to store in jwt
//   // arg 2: token secret
//   // arg 3: configuration object
//   return jwt.sign({
//     'username': user.username,
//     'id': user.id,
//     'email': user.email
//   }, process.env.TOKEN_SECRET, {
//     // w for weeks, m for minutes, s for seconds
//     'expiresIn': '10m'
//   });
// }

// getHashedPassword()


router.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await UserSvc.verifyUserByUsernamePw(username, password);
  console.log("user verification on login.js", user)

  if (user) {
    const refreshToken = generateToken(user.toJSON(), process.env.REFRESH_TOKEN_SECRET, '2w');
    const accessToken = generateToken(user.toJSON(), process.env.TOKEN_SECRET, '10m');
    res.cookie('refreshToken', refreshToken, {
      // path: 'http://localhost:3001/',
      httpOnly: true,
      // secure: false,
      // sameSite: 'Lax',
      // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
      // additional options like secure: true, sameSite: 'None' for secure and cross-site cookies
    });
    console.log("setting refresh token into cookie after login", refreshToken)
    res.send({ accessToken })

  } else {

    res.send({
      'error': 'Wrong email or password'
    })
  }
})


router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;;
  console.log("refresh Token from payload for getting new access token", refreshToken)
  if (!refreshToken) {
    // res.sendStatus(401);
    res.json({ 'message': 'no refresh token found in cookie' })
  } else {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async function (err, user) {
      if (err) {
        res.status(401);
        res.json({
          'message': 'No refresh token found, error with verification rf token on client side'
        })
      } else {
        // check if the refresh token is blacklisted
        const blacklistedToken = await TokenSvc.getBlToken(refreshToken)
        console.log("retreiving blacklisted token from database", blacklistedToken)
        if (blacklistedToken) {
          res.status(403);
          return res.json({
            'message': 'The refresh token has been blacklisted'
          })
        }
        const accessToken = generateToken(user, process.env.TOKEN_SECRET, '10m')
        res.send({ accessToken })
      }
    })
  }
})

router.get('/profile', checkIfAuthJWT, (req, res) => {
  
    res.send(
      req.user
    )

})

module.exports = router;
