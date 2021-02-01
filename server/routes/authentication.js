'use strict';
const passport = require('passport');

function authenticate(req, res, next) {
  var auth = passport.authenticate('local', function(err, user) {
    if(err) {return next(err);}
    if(!user) { res.send({success:false})}
    req.logIn(user, function(err) {
      if(err) {return next(err);}
      console.log(user);
      res.send({success:true, user: user});
    })
  })
  auth(req, res, next);
}

function requiresApiLogin(req, res, next) {
  next();
  // if(!req.isAuthenticated()) {
  //   res.status(403);
  //   res.end();
  // } else {
  //   next();
  // }
}

let getPlainRoles = (roles) => {
  var r = [];
  for(var i=0; i<roles.length; i++) {
    var role = roles[i];
    if(typeof role === 'string' || role instanceof String) {
      r.push(role);
    } else {
      r.push(role.role);
    }
  }
  return r;
}

function requiresRole(role) {
    return (req, res, next) => {
        // console.log(req.isAuthenticated());
        // console.log(getPlainRoles(req.user.roles));
        if(!req.isAuthenticated() || getPlainRoles(req.user.roles).indexOf(role) === -1) {
          res.status(403);
          res.end();
        } else { next(); }
      //next();
    }
}

function requiresOneRoleOutOf(roles) {
    return (req, res, next) => {
      next();
      // let hasRole = false;
      // roles.forEach(r => {
      //   if(getPlainRoles(req.user.roles).indexOf(r) !== -1) hasRole = true;
      // });
      // if(!req.isAuthenticated() || !hasRole) {
      //   res.status(403);
      //   res.end();
      // } else { next(); }
    }
}

module.exports = {
    authenticate,
    requiresApiLogin,
    requiresRole,
    requiresOneRoleOutOf
};
