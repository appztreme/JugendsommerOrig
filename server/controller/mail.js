var email   = require("./../../node_modules/emailjs/email");
var server  = email.server.connect({});

var htmlStart = "<html><body><p>Die Anmeldung f&uuml;r ";
var htmlEnd = " f&uuml;r die Sommerprogramme des Jugenddienstes Bozen Land war erfolgreich.</p><p>Einzahlungsschein wird demn&auml;chst mittels email zugesandt.</p><p>Vielen Dank f&uuml;r die Anmeldung.</p></body></html>";

var htmlSpiritnight = "<html><body><p><strong>Vielen Dank</strong> f&uuml;r die Teilnahme an der SpiritNight 2017!</p><p>Bitte best&auml;tigen Sie die Anmeldung bis zum <strong>31.03.2017</strong> mit einer gesammelten &Uuml;berweisung f&uuml;r die gesamte Pfarrei. Die Gesamtsumme kann an folgende Konten &uuml;berwiesen werden:</p><p>S&uuml;dtiroler Volksbank<br />IBAN: IT42C0585658220070571084313<br />SWIFT/BIC: BPAAIT2BBRE</p><p>S&uuml;dtiroler Sparkasse<br />IBAN: IT62J0604558220000000078000<br />SWIFT/BIC: CRBZIT2B050</p><p>Raiffeisenkasse Eisacktal:<br />IBAN: IT95Y0830759090000301223658<br />SWIFT/BIC: RZSBIT21107</p><p>Bitte geben Sie bei der &Uuml;berweisung <strong>Spiritnight 2017 / Name der Pfarrei</strong> an.</p></body></html>";

var txtStart = "Die Anmeldung für ";
var txtEnd = " für die Sommerprogramme des Jugenddienstes Bozen Land war erfolgreich. Einzahlungsschein wird demnächst mittels email zugesandt.";

function getTypeString(type) {
	switch (type) {
		case 'summer': return 'Jugendsommer'; break;
		case 'music': return 'Musikwoche'; break;
		case 'spiritnight': return 'SpiritNight'; break;
		case 'club': return 'Jugendraum'; break;
		default: return 'Jugendsommer';
	}
}

function getTypeBody(type) {
	switch (type) {
		case 'summer':
		case 'music':
		case 'club':
			return htmlStart + firstNameChild + " " + lastNameChild + htmlEnd;
			break;
		case 'spiritnight':
			return htmlSpiritnight;
			break;
		default:
			return htmlStart + firstNameChild + " " + lastNameChild + htmlEnd;
			break;
	}
}

exports.sendTxtMail = function(recipient, firstNameChild, lastNameChild, type) {
		server.send({
		text: txtStart + firstNameChild + " " + lastNameChild + txtEnd,
		from: "info@jugenddienst.com",
		to: recipient,
		subject: "Anmeldung " + getTypeString(type),
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
