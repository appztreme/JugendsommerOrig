var email   = require("./../../node_modules/emailjs/email");
var server  = email.server.connect({});
var mailbuilder = require('./mailBuilder');

exports.sendTxtMail = function(recipient, firstNameChild, lastNameChild, type, isKiso, activities, reservation) {
		var body = mailbuilder.getTypeBody(type, firstNameChild, lastNameChild, isKiso, activities, reservation);
		var text = mailbuilder.getTypeText(type, firstNameChild, lastNameChild, isKiso);
        var fromEmail = isKiso ? 'kiso@jd.bz.it' : 'info@jugenddienst.com';
		var subjectEmail = isKiso ? mailbuilder.getKisoSubject(type) : 'Anmeldung ' + mailbuilder.getTypeString(type);
		console.log("body", body);
		server.send({
		text: text,
		from: fromEmail,
		to: recipient,
		subject: subjectEmail,
		attachment: [{ data: body, alternative: true },
		             { path:"public/assets/jdbl-logo.jpg", type:"image/jpg", headers:{"Content-ID":"<my-image>"} }]
	}, function(err, message) {console.log(err||message); });
};

exports.sendUserTokenMail = function(recipient, userToken, isKiso) {
	var fromEmail = isKiso ? 'kiso@jd.bz.it' : 'info@jugenddienst.com';
	var subjectEmail = isKiso ? 'Passwortänderung/Modifica password kiso@jd.bz.it' : 'Passwortänderung Jugendsommer.com';
	server.send({
		from: fromEmail,
		to: recipient,
		subject: subjectEmail,
		text: "Der Sicherheits-Code zum Zurücksetzen Ihres Passwortes lautet: " + userToken + '\r\n\r\n' + "Il Suo codice di sicurezza per la modifica del password é " + userToken
	}, function(err, message) { console.log(err||message); });
}






