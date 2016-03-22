var db = require('../db');
var crypto = require('crypto');

var userSchema = db.Schema({
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
    userTel: { type: String, required: true },
		userEmail: { type: String, required: true },
		userName: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    salt: { type: String },
    roles: [String]
});

userSchema.index({userName: 1}, {unique: true});

userSchema.methods = {
	authenticate: function(passwordToMatch) {
		return hashPwd(this.salt, passwordToMatch) === this.hashedPassword;
	},
	hashPassword: function(pwd) {
		this.salt = createSalt();
		this.hashedPassword = hashPwd(this.salt, pwd);
	}
};

function createSalt() {
	return crypto.randomBytes(128).toString('base64');
};

function hashPwd(salt, pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
};

var User = db.model('User', userSchema);

module.exports = User;
