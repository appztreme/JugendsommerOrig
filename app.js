'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var app = exports.app = express();
// app.use(helmet());
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com',"'unsafe-inline'"],
//       fontSrc: ["'self'", 'maxcdn.bootstrapcdn.com'],
//       'script-src': ["'self'", "'unsafe-inline'", "'unsave-eval'"],
//       'img-src': ["'self'", 'maxcdn.bootstrapcdn.com', 'data:', 'https:'],
//     }
//   }));
//app.use(helmet.permittedCrossDomainPolicies())
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'Sommer', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/lib"));
app.use(express.static(__dirname + "/public/templates"));
app.use(express.static(__dirname + "/public/build"));

app.use('/', require('./server/routes/staticRoute'));
app.use('/api/events', require('./server/routes/eventRoute'));
app.use('/api/activities', require('./server/routes/activityRoute'));
app.use('/api/registrations', require('./server/routes/registrationRoute'));
app.use('/api/myRegistrations', require('./server/routes/myRegistrationRoute'));
app.use('/api/commitments', require('./server/routes/commitmentRoute'));
app.use('/api/login', require('./server/routes/loginRoute'));
app.use('/api/logout', require('./server/routes/logoutRoute'));
app.use('/api/user', require('./server/routes/userRoute'));
app.use('/api/agb', require('./server/routes/agbRoute'));
app.use('/api/resources', require('./server/routes/resourceRoute'));
app.use('/api/lendings', require('./server/routes/lendingRoute'));
app.use('/api/locations', require('./server/routes/locationRoute'));
app.use('/api/contact', require('./server/routes/contactRoute'));
app.use('/api/articles', require('./server/routes/articleRoute'));
app.use('/api/loans', require('./server/routes/loanRoute'));

require('./server/passport.config')();

module.exports = app;
