'use strict';
var User = require('./../models/user');
var router = require('express').Router();
var crypto = require('crypto');
var mail = require('./mail.js');

exports.create = (req, res, next) => {
	let salt = createSalt();
	let pwd = hashPwd(salt, req.body.pwd);
	let user = new User({
			 firstName: req.body.firstName,
			 lastName: req.body.lastName,
			 userTel: req.body.userTel,
			 userEmail: req.body.userEmail,
			 userName: req.body.userName,
			 hashedPassword: pwd,
			 salt: salt
 	 });
	 user.hashPassword(req.body.pwd);
	 user.save(function(err, user) {
		 if(err) { return next(err); }
		 res.status(201).json(user);
 	});
};

exports.findById = (req, res, next) => {
	User.findOne({_id: req.params.id})
			.select('_id firstName lastName userTel userEmail userName roles eventId')
			.exec(function(err, user) {
		if(err) { next(err); }
		res.status(201).json(user);
	});
};

exports.search = (req, res, next) => {
	User.find({ $or: [
			{firstName: {'$regex': req.params.txt }},
			{lastName: {'$regex': req.params.txt }},
			{userName: {'$regex': req.params.txt }}
		]})
		.select('_id firstName lastName userName userEmail roles eventId')
		.exec(function(err, users) {
			if(err) { next(err); }
			res.json(users);
		});
}

exports.updateRoles = (req, res, next) => {
	User.findById(req.body._id)
		.exec((err, user) => {
			if(err) { next(err); }
			user.roles = req.body.roles;
			user.eventId = req.body.eventId;
			user.save(function(err, userSaved) {
				if(err) { next(err); }
				res.status(200).json(userSaved);
			});
		});
}

exports.updatePwd = (req, res, next) => {
	User.findOne({userName: req.body.userName})
		.exec((err, user) => {
			if(err) { next(err); }
			if(user.checkUserToken(req.body.userToken)) {
				user.hashPassword(req.body.password);
				user.save(function(errSave, userSave) {
					if(err) { return next(err); }
					res.status(201).end();
				});
			} else {
					next(new Error("Security Token Mismatch"));
			}
		});
};

exports.requestUserToken = (req, res, next) => {
	User.findOne({userName: req.body.userName})
		.exec((err, user) => {
			if(err) { next(err); }
			mail.sendUserTokenMail(user.userEmail, user.getUserToken());
			res.status(202).end();
		});
};

function createSalt() {
	return crypto.randomBytes(128).toString('base64');
};

function hashPwd(salt, pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
};
