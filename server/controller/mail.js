var email   = require("./../../node_modules/emailjs/email");
var server  = email.server.connect({});

var htmlStart = "<html><body><p>Die Anmeldung f&uuml;r ";
var htmlEnd = " f&uuml;r die Sommerprogramme des Jugenddienstes Bozen Land war erfolgreich.</p><p>Einzahlungsschein wird demn&auml;chst mittels email zugesandt.</p><p>Vielen Dank f&uuml;r die Anmeldung.</p></body></html>";

var txtStart = "Die Anmeldung für ";
var txtEnd = " für die Sommerprogramme des Jugenddienstes Bozen Land war erfolgreich. Einzahlungsschein wird demnächst mittels email zugesandt.";


exports.sendTxtMail = function(recipient, firstNameChild, lastNameChild) {
		server.send({
		text: txtStart + firstNameChild + " " + lastNameChild + txtEnd,
		from: "info@jugenddienst.com",
		to: recipient,
		subject: "Anmeldung Jugendsommer",
		attachments: { data: htmlStart + firstNameChild + " " + lastNameChild + htmlEnd,
			       alternative: true }
	}, function(err, message) {console.log(err||message); });
};

exports.sendUserTokenMail = function(recipient, userToken) {
	server.send({
		from: "info@jugenddienst.com",
		to: recipient,
		subject: "Passwortänderung Jugendsommer.com",
		text: "Der Sicherheits-Code zum Zurücksetzen Ihres Passwortes lautet: " + userToken
	}, function(err, message) { console.log(err||message); });
}
