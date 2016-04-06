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

app.use('/', require('./server/controller/static'));
app.use('/api/events', require('./server/routes/eventRoute'));
app.use('/api/activities', require('./server/controller/api/activities'));
app.use('/api/registrations', require('./server/controller/api/registration'));
app.use('/api/myRegistrations', require('./server/controller/api/myRegistration'));
app.use('/api/login', require('./server/controller/api/login'));
app.use('/api/logout', require('./server/controller/api/logout'));
app.use('/api/user', require('./server/routes/userRoute'));
app.use('/api/agb', require('./server/controller/api/agb'));

require('./server/passport.config')();

module.exports = app;
