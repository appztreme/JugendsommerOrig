'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var app = exports.app = express();
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

app.use('/', require('./server/controllers/static'));
app.use('/api/events', require('./server/controllers/api/events'));
app.use('/api/activities', require('./server/controllers/api/activities'));
app.use('/api/registrations', require('./server/controllers/api/registration'));
app.use('/api/myRegistrations', require('./server/controllers/api/myRegistration'));
app.use('/api/login', require('./server/controllers/api/login'));
app.use('/api/logout', require('./server/controllers/api/logout'));
app.use('/api/user', require('./server/controllers/api/users'));
app.use('/api/agb', require('./server/controllers/api/agb'));

require('./server/passport.config')();

module.exports = app;
