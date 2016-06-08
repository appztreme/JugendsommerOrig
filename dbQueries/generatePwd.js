var crypto = require('crypto');

var pwd = "aadLs73J";

function createSalt() {
	return crypto.randomBytes(128).toString('base64');
};

function hashPwd(salt, pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
};

console.log("PWD:", pwd);
var salt = 'oeam+DTYmX24xXOMrWf/L8RnaUhgeBPM/qiujmrlhbhtawVOm5Ni85DsPsaGwOnc6sAwO84hnqEGrdHUEtOfdMBj+GiBKCuHiIs1edodRmugZ849NmJ9VL9DVA4b4ljGOPlvSrRpRcMO0CNs+ZEhgzvntZhphu5Ov8b/SzkB8cw=';//createSalt();
console.log("SALT:", salt);
var hash = hashPwd(salt, pwd);
console.log("HASH:", hash);
