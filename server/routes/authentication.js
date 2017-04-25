'use strict';
const passport = require('passport');

function authenticate(req, res, next) {
  var auth = passport.authenticate('local', function(err, user) {
    if(err) {return next(err);}
    if(!user) { res.send({success:false})}
    req.logIn(user, function(err) {
      if(err) {return next(err);}
      res.send({success:true, user: user});
    })
  })
  auth(req, res, next);
}

function requiresApiLogin(req, res, next) {
  if(!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
}

function requiresRole(role) {
    return (req, res, next) => {
        if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
          res.status(403);
          res.end();
        } else { next(); }
    }
}

function requiresOneRoleOutOf(roles) {
    return (req, res, next) => {
      let hasRole = false;
      roles.forEach(r => {
        if(req.user.roles.indexOf(r) !== -1) hasRole = true;
      });
      if(!req.isAuthenticated() || !hasRole) {
        res.status(403);
        res.end();
      } else { next(); }
    }
}

module.exports = {
    authenticate,
    requiresApiLogin,
    requiresRole,
    requiresOneRoleOutOf
};
