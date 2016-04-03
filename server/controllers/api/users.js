var User = require('../../models/user');
var router = require('express').Router();
var crypto = require('crypto');
var mail = require('./mail.js');

router.post('/', function(req, res, next) {
	 var salt = createSalt();
	 var pwd = hashPwd(salt, req.body.pwd);

	var user = new User({
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
});

router.get('/:id', function(req, res, next) {
	User.findOne({_id: req.params.id})
			.select('_id firstName lastName userTel userEmail userName roles')
			.exec(function(err, user) {
		if(err) { next(err); }
		res.status(201).json(user);
	});
});

router.post('/updatePwd', (req, res, next) => {

});

router.post('/requestUserToken', (req, res, next) => {
	var uName = req.body.userName;
	User.findOne({userName: req.body.userName})
		.exec((err, user) => {
			if(err) { next(err); }
			mail.sendUserTokenMail(user.userEmail, getUserToken(user));
			res.status(202);
		});
});

function getUserToken(user) {
		if(user.hashedPassword.length >= 25)
		{
			return "" +
						 user.hashedPassword[0] +
			       user.hashedPassword[7] +
						 user.hashedPassword[13] +
						 user.hashedPassword[22];
		} else {
			return user.hashedPassword.substring(user.hashedPassword.length - 4);
		}
};

function createSalt() {
	return crypto.randomBytes(128).toString('base64');
};

function hashPwd(salt, pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
};

module.exports = router;
