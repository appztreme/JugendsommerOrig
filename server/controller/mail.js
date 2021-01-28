var email   = require("./../../node_modules/emailjs/email");
var server  = email.server.connect({});
const platform = require('./platform')
var mailbuilder = require('./mailBuilder');

exports.sendTxtMail = function(recipient, firstNameChild, lastNameChild, type, activities, reservation, instance) {
		var body = mailbuilder.getTypeBody(type, firstNameChild, lastNameChild, activities, reservation, instance);
		var text = mailbuilder.getTypeText(type, firstNameChild, lastNameChild, activities[0].eventId.location, instance, activities);
        var fromEmail = mailbuilder.getSender(instance);
		var subjectEmail = mailbuilder.getSubject(instance, type);
		var pdf = mailbuilder.getReservationAttachment(type, firstNameChild, lastNameChild, activities, reservation, instance);
		//console.log("body", body);
		server.send({
		text: text,
		from: fromEmail,
		to: recipient,
		subject: subjectEmail,
		attachment: mailbuilder.getAttachment(body, instance, pdf)
	}, function(err, message) {console.log(err||message); });
};

exports.sendReceiptMail = function(recipient, registrations, rnumber, instance) {
	//console.log(rnumber, recipient, instance, registrations);
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
		if(err) console.log("ERROR:", err);
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

exports.sendConfirmationMail = function(recipient, registrations, instance) {
	console.log("send confirmation mail start")
	var body = mailbuilder.getConfirmationBody();
	var text = mailbuilder.getConfirmationTxt();
	var fromEmail = mailbuilder.getSender(instance);
	var subject = mailbuilder.getSubject(instance, "confirmation");
	//console.log("body", fromEmail, subject, recipient);
	server.send({
		text: text,
		from: fromEmail,
		to: recipient,
		subject: subject,
		attachment: mailbuilder.getAttachmentConfirmation(body, instance, registrations)
	}, function(err, message) {
		if(err) console.log("ERROR:", err);
		else console.log("finished confirmation")
	});
}

exports.sendReminderMail = function(recipient, registrations, instance) {
	var reg = registrations.length > 0 ? registrations[0] : {};
	var rnumber = reg.receiptNumber ? reg.receiptNumber : 0;
	var body = mailbuilder.getReminderBody(registrations, rnumber);
	var text = mailbuilder.getReminderTxt();
	var fromEmail = mailbuilder.getSender(instance);
	var subject = mailbuilder.getSubject(instance, "reminder");
	server.send({
		text: text,
		from: fromEmail,
		to: recipient,
		subject: subject,
		attachment: mailbuilder.getAttachment(body, instance)
	}, function(err, message) { console.log(err||message); });	
}

exports.sendSorryMail = function(recipient) {
	var body = mailbuilder.getSorryHtml();
	var text = mailbuilder.getSorryText();
    var fromEmail = 'sommer@jugenddienst.com';
	var subjectEmail = "Fehler Einzahlung Jugendsommer 2018";
	console.log("body", body);
	server.send({
		text: text,
		from: fromEmail,
		to: recipient,
		subject: subjectEmail,
		attachment: mailbuilder.getAttachment(body, platform.getPlatform('www.jugendsommer.com'))
	}, function(err, message) {console.log(err||message); });	
}

exports.sendUserTokenMail = function(recipient, userToken, platform) {
	var fromEmail = mailbuilder.getSender(platform);
	var subjectEmail = 'Passwortänderung/Modifica password ' + platform.host;
	server.send({
		from: fromEmail,
		to: recipient,
		subject: subjectEmail,
		text: "Der Sicherheits-Code zum Zurücksetzen Ihres Passwortes lautet: " + userToken + '\r\n\r\n' + "Il Suo codice di sicurezza per la modifica del password é " + userToken
	}, function(err, message) { console.log(err||message); });
}






