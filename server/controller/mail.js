var email   = require("./../../node_modules/emailjs/email");
var server  = email.server.connect({});
var mailbuilder = require('./mailBuilder');

exports.sendTxtMail = function(recipient, firstNameChild, lastNameChild, type, activities, reservation, instance) {
		var body = mailbuilder.getTypeBody(type, firstNameChild, lastNameChild, activities, reservation, instance);
		var text = mailbuilder.getTypeText(type, firstNameChild, lastNameChild, activities[0].eventId.location, instance);
        var fromEmail = mailbuilder.getSender(instance);
		var subjectEmail = mailbuilder.getSubject(instance, type);
		console.log("body", body);
		server.send({
		text: text,
		from: fromEmail,
		to: recipient,
		subject: subjectEmail,
		attachment: mailbuilder.getAttachment(body, instance)
	}, function(err, message) {console.log(err||message); });
};

exports.sendReceiptMail = function(recipient, registrations, rnumber, instance) {
	var body = mailbuilder.getReceiptBody(registrations, rnumber);
	var text = mailbuilder.getReceiptTxt();
	var fromEmail = mailbuilder.getSender(instance);
	var subject = mailbuilder.getSubject(instance, "receipt");
	//console.log("body", fromEmail, subject, recipient);
	server.send({
		text: text,
		from: fromEmail,
		to: recipient,
		subject: subject,
		attachment: mailbuilder.getAttachment(body, instance)
	}, function(err, message) {
		if(err) console.log(err||message);
		else {
				//console.log("persist to db", registrationsPerMail.length);
				for(let i = 0; i < registrations.length; i++) {
					// console.log("counter", i);
					let reg = registrations[i];
					// console.log("Log", reg, receiptNr);
					reg.receiptNumber = rnumber;
					reg.isEmailNotified = true;
					// console.log("reg", reg);
					reg.save();
					console.log("end")
				}
			}	
	});
}

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






