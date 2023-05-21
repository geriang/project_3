const express = require('express')
const router = express.Router();
const generateToken = require('../../utils/generateToken');
const UserService = require('../../services/userService')

// for initializing passport
const passport = require("passport")

// for google oauth2.0
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const UserSvc = new UserService()

router.get('/auth/google',
  passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));

router.get('/sessions/oauth/google',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  function (req, res) {
    const user = req.user 
    const refreshToken = generateToken(user.toJSON(), process.env.REFRESH_TOKEN_SECRET, '1w');
    // const accessToken = generateToken(user.toJSON(), process.env.REFRESH_TOKEN_SECRET, '10m');
    res.cookie('refreshToken', refreshToken, {
      // path: 'http://localhost:3001/',
      httpOnly: true,
      // secure: false,
      // sameSite: 'Lax',
      // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
      // additional options like secure: true, sameSite: 'None' for secure and cross-site cookies
    });
    console.log("setting refresh token into cookie after login", refreshToken)
    res.redirect('http://localhost:3001/')
   
  });

// // set up google oauth2.0
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/google-login/sessions/oauth/google"
},
  async function (accessToken, refreshToken, profile, cb) {
   
    const googleId = profile.id
    const username = profile.displayName
    const email = profile.emails[0].value
    const firstName = profile.name.givenName
    const lastName = profile.name.familyName

    const user = await UserSvc.verifyUserByEmail(email);
    if (user) {
      console.log('googleLogin.js => user found')
      // console.log("google auth access token", accessToken)
      // console.log("google auth refresh token", refreshToken)

      return cb(null, user)
    };
    
     // insert into database
    const newUser = await UserSvc.createNewGoogleUser(googleId, username, email, firstName, lastName)
    return cb(null, newUser)
  }
));

module.exports = router;