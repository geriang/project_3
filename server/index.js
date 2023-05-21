// initialize express
const express = require('express');

// for .env file configuration
require('dotenv').config();

// for accessing rest api endpoint
const cors = require('cors');

// for csurf securtiy 
const csrf = require('csurf')
const csurfInstance = csrf({cookie:true})

// for using authentication when accessing certain routes

// for importing in routes
const landingRoutes = require('./routes/landing');
const agentsRoutes = require('./routes/agents');
const registerRoutes = require('./routes/register')
const loginRoutes = require('./routes/login')
const logoutRoutes = require('./routes/logout')
const vendorRoutes = require('./routes/vendor');

// for importing endpoint routes
const apiLoginRoutes = require('./routes/api/login');
const googleLoginRoutes = require('./routes/api/googleLogin');
const propertyManagementRoutes = require('./routes/api/property');
const cartRoutes = require('./routes/api/cart');
const apiLogoutRoutes = require('./routes/api/logout');
const cloudinaryRoutes = require('./routes/api/cloudinary');

// for importing user endpoint routes
// const userLoginRoutes = require('./routes/user/login')
// const userLogoutRoutes = require('./routes/user/logout')

// for initalizing session
const session = require("express-session");
const FileStore = require("session-file-store")(session);

// for initailizing flash
const flash = require("connect-flash");

// for rendering and template
const hbs = require('hbs');
const wax = require('wax-on');

// for cookie 
const cookieParser = require('cookie-parser');

// setup wax-on
wax.on(hbs.handlebars); // register wax-on helpers with handlerbars
wax.setLayoutPath('./views/layout');


// initiate app
const App = express();

// enable cookie
App.use(cookieParser());

// enable cors
App.use(cors({
    origin: 'http://localhost:3001', // Set this to the origin making the request
    credentials: true, // Allow credentials (cookies) to be sent with requests
}));

// App.use(express.json());


// enable forms
App.use(
    express.urlencoded({
        extended: false,
    })
);

// set up the view engine
App.set('view engine', 'hbs');



// set up sessions, before flash & routes
App.use(session({
    store: new FileStore(),
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

// set up flash
App.use(flash());

// App.use(function (req, res, next) {
//     if (req.url === "/cart/checkout/processes") {
//         return next()
//     }
//     csurfInstance(req, res, next);
// })

// middlewares routing for flash and csrf
App.use(function (req, res, next) {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');

    // res.locals.token = req.csrfToken();
    // console.log('req.session:', req.session);
    // console.log('req.user:', req.user);

    // This is so that the rendered page has access to the logged in user details
    // res.locals.user = req.session.user;
    next();
})

// register routes
App.use('/', landingRoutes);
App.use('/agent', agentsRoutes);
App.use('/register', registerRoutes);
App.use('/login', loginRoutes);
App.use('/logout', logoutRoutes)
App.use('/vendor', vendorRoutes);

// register endpoint routes
App.use('/user-login', express.json(), apiLoginRoutes);
App.use('/google-login', googleLoginRoutes);
App.use('/property', express.json(), propertyManagementRoutes);
App.use('/cart', express.json(), cartRoutes);
App.use('/user-logout', express.json(), apiLogoutRoutes);
App.use('/cloudinary', express.json(), cloudinaryRoutes);

// register user endpoint routes
// App.use('/user-login', userLoginRoutes);
// App.use('/user-logout', userLogoutRoutes)


App.listen(3000, () => {
    console.log('server Started')
});