'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

module.exports = function()
{
    passport.use('local', new LocalStrategy(
			function(username, password, done) {
				User.findOne({userName: username}).exec(function(err, user) {
					if(user && user.authenticate(password)) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				});
			}));

    passport.serializeUser(function(user, done) {
	    if(user) { 
		    done(null, user._id);
	    }
    });


    passport.deserializeUser(function(id, done) {
	    User.findOne({_id: id}).exec(function(err, user) {
		    if(user) {
				//console.log("passport: ", user);
			    return done(null, user);
		    } else {
			    return  done(null, false);
		    }
	    })
    });
}
