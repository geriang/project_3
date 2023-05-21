const express = require('express')
const router = express.Router();
const { verifyEmail, verifyId } = require('../../dal/userDAL');
const { createGoogleUser } = require('../../dal/userDAL')

// for initializing passport
const passport = require("passport")

// for google oauth2.0
const GoogleStrategy = require('passport-google-oauth20').Strategy;

router.use(passport.initialize());
router.use(passport.session());

// label user into session 
passport.serializeUser((user, done) => {
  return done(null, user.id);
})

// retrieving info from session
passport.deserializeUser((id, done) => {
  verifyId(id, (err, user) => {
    if (err) {
      return done(err);
    }
    return done(null, user);
  })
})

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/sessions/oauth/google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {

    res.redirect('http://localhost:3001/login');
  });


// set up google oauth2.0
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // callbackURL: "/user-login/sessions/oauth/google"
},
  async function (accessToken, refreshToken, profile, cb) {

    // insert into database
    const googleId = profile.id
    const username = profile.displayName
    const email = profile.emails[0].value
    const firstName = profile.name.givenName
    const lastName = profile.name.familyName

    const user = await verifyEmail(email);
    if (user) {
      console.log('googleLogin.js => user found')
      return cb(null, user)
    };
    const newUser = await createGoogleUser(googleId, username, email, firstName, lastName)
    cb(null, newUser)
  }
));

// normal login route via password and username

// // API route for user authentication
// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Verify user's credentials
//     const user = await verify(username, password);
//     console.log(user, "user details")

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Add user information to the session
//     req.session.user = {
//       id: user.get('id'),
//       username: user.get('username'),
//       email: user.get('email'),
//     };

//     // Send a success response with user information
//     res.status(200).json({
//       message: `Welcome back, ${user.get('username')}`,
//       user: {
//         id: user.get('id'),
//         username: user.get('username'),
//         email: user.get('email'),
//       },
//     });

//     res.redirect('http://localhost:3001/')
//   } catch (error) {
//     console.error('Authentication error:', error);
//     res.status(500).json({ error: 'An error occurred during authentication' });
//   }
// });

module.exports = router;