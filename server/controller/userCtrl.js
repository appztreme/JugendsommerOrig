'use strict';
const User = require('./../models/user');
const router = require('express').Router();
const crypto = require('crypto');
const mail = require('./mail.js');
const repo = require('./../repositories/user');
const platform = require('./platform');

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

exports.findById = async(req, res, next) => {
	try {
		let user = await repo.findById(req.params.id);
		res.json(user);
	}
	catch(err) { next(err); }
};

exports.search = async(req, res, next) => {
	try {
		let users = await repo.search(req.params.txt);
		res.json(users);
	}
	catch(err) { next(err); }
}

exports.deleteRole = (req, res, next) => {
	User.findById(req.body.id)
		.exec((err, user) => {
			if(err) { next(err); }
			const index = user.roles.findIndex(r => r.role === req.body.role && r.areaId === req.body.areaId && r.areaName === req.body.areaName);
			if(index > -1) { 	
				user.roles.splice(index, 1)
			};
			user.save(function(errSave, userSaved) {
				if(errSave) { next(errSave); }
				res.status(201).json(userSaved);
			})
		})
	
}

exports.updateRoles = (req, res, next) => {
	User.findById(req.body.id)
		.exec((err, user) => {
			if(err) { next(err); }
			const role = {"role": req.body.role, "areaId": req.body.areaId, "areaName": req.body.areaName};
			user.roles.push(role);
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
			var instance = platform.getPlatform(req.get('host'));
			mail.sendUserTokenMail(user.userEmail, user.getUserToken(), instance);
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
