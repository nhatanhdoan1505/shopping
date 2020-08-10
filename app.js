const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const Admin = require('./model/admin')
const {
    escapeXML
} = require('ejs')

const app = express()

// Express EJS Template
app.set('view engine', 'ejs')
app.set('views', './views')

// Static foler
app.use(express.static(__dirname + '/public'));

// Express body-Parser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(cookieParser());

// Passport Config
require('./config/passport')(passport);

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// res.locals is an object passed to hbs engine
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// MongoDB Connection
require('./mongooes/mongooes')

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Router
app.use('/', require('./routes/index'))
app.use('/admin', require('./routes/admin'))
app.use('/manage', require('./routes/manage'))
app.use('/product', require('./routes/product'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));