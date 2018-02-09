var email   = require("./../../node_modules/emailjs/email");
var server  = email.server.connect({});

var htmlStart = "<html><body><p>Die Anmeldung f&uuml;r ";
var htmlEnd = " f&uuml;r die Sommerprogramme des Jugenddienstes Bozen Land war erfolgreich.</p><p>Einzahlungsschein wird demn&auml;chst mittels email zugesandt.</p><p>Vielen Dank f&uuml;r die Anmeldung.</p><h3>Zusammenfassung:</h3>";
var htmlClose = "<br /><img src='cid:my-image' width='50' height ='50' /></body></html>";

var htmlSpiritnight = "<html><body><p><strong>Vielen Dank</strong> f&uuml;r die Teilnahme an der SpiritNight 2017!</p><p>Bitte best&auml;tigen Sie die Anmeldung bis zum <strong>31.03.2017</strong> mit einer gesammelten &Uuml;berweisung f&uuml;r die gesamte Pfarrei. Die Gesamtsumme kann an folgende Konten &uuml;berwiesen werden:</p><p>S&uuml;dtiroler Volksbank<br />IBAN: IT42C0585658220070571084313<br />SWIFT/BIC: BPAAIT2BBRE</p><p>S&uuml;dtiroler Sparkasse<br />IBAN: IT62J0604558220000000078000<br />SWIFT/BIC: CRBZIT2B050</p><p>Raiffeisenkasse Eisacktal:<br />IBAN: IT95Y0830759090000301223658<br />SWIFT/BIC: RZSBIT21107</p><p>Bitte geben Sie bei der &Uuml;berweisung <strong>Spiritnight 2017 / Name der Pfarrei</strong> an.</p></body></html>";
var txtSpiritnight = "Vielen Dank für die Teilnahme an der SpiritNight 2017! Bitte bestätigen Sie die Anmeldung bis zum 31.03.2017 mit einer gesammelten Überweisung für die gesamte Pfarrei. Die Gesamtsumme kann an folgende Konten überwiesen werden: Südtiroler Volksbank IBAN: IT42C0585658220070571084313 SWIFT/BIC: BPAAIT2BBRE; Südtiroler Sparkasse IBAN: IT62J0604558220000000078000 SWIFT/BIC: CRBZIT2B050; Raiffeisenkasse Eisacktal IBAN: IT95Y0830759090000301223658 SWIFT/BIC: RZSBIT21107 Bitte geben Sie bei der Überweisung 'Spiritnight 2017 / Name der Pfarrei' an.";


var txtStart = "Die Anmeldung für ";
var txtEnd = " für die Sommerprogramme des Jugenddienstes Bozen Land war erfolgreich. Einzahlungsschein wird demnächst mittels email zugesandt.";

var htmlKiso = "<html><body>Vielen Dank für die Anmeldung Ihres Kindes zum KISO 2017!<br />Sie erhalten innerhalb der n√§chsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.<br />Falls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.<br />Freundliche Grüße,<br />das Jugenddienst Bozen Team<br /><br />Ringraziamo per l'iscrizione di suo/a figlio/a al KISO 2017!<br />Nei prossimi giorni lo Jugenddienst Bozen<br />Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d'attesa.<br />Cordiali saluti,<br />l'equipe dello Jugenddienst Bozen";
var textKiso = "Vielen Dank für die Anmeldung Ihres Kindes zum KISO 2017!\r\nSie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.\r\nFalls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.\r\nFreundliche Grüße, das Jugenddienst Bozen Team \r\n\r\nRingraziamo per l’iscrizione di suo/a figlio/a al KISO 2017!\r\nNei prossimi giorni lo Jugenddienst Bozen Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d‘attesa.\r\nCordiali saluti,\r\nl’equipe dello Jugenddienst Bozen";
var htmlJumpRun = "<html><body>Vielen Dank für die Anmeldung Ihres Kindes zum Jump&Run 2017!<br />Sie erhalten innerhalb der n√§chsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.<br />Falls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.<br />Freundliche Grüße,<br />das Jugenddienst Bozen Team<br /><br />Ringraziamo per l'iscrizione di suo/a figlio/a al Jump&Run 2017!<br />Nei prossimi giorni lo Jugenddienst Bozen<br />Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d'attesa.<br />Cordiali saluti,<br />l'equipe dello Jugenddienst Bozen";
var textJumpRun = "Vielen Dank für die Anmeldung Ihres Kindes zum Jump&Run 2017!\r\nSie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.\r\nFalls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.\r\nFreundliche Grüße, das Jugenddienst Bozen Team \r\n\r\nRingraziamo per l’iscrizione di suo/a figlio/a al Jump&Run 2017!\r\nNei prossimi giorni lo Jugenddienst Bozen Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d‘attesa.\r\nCordiali saluti,\r\nl’equipe dello Jugenddienst Bozen";

function getTypeString(type) {
	switch (type) {
		case 'summer': return 'Jugendsommer'; break;
		case 'music': return 'Musikwoche'; break;
		case 'spiritnight': return 'SpiritNight'; break;
		case 'club': return 'Jugendraum'; break;
		case 'jumprun': return 'Jump&Run'; break;
		default: return 'Jugendsommer';
	}
}

function getTypeText(type, firstNameChild, lastNameChild, isKiso) {
	if(isKiso) {
		if(type === 'jumprun')
			return textJumpRun;
		else
			return textKiso;
	} else {
		switch (type) {
			case 'summer':
			case 'music':
			case 'club':
				return txtStart + firstNameChild + " " + lastNameChild + txtEnd;
				break;
			case 'spiritnight':
				return txtSpiritnight;
				break;
			default:
				return txtStart + firstNameChild + " " + lastNameChild + txtEnd;
				break;
		}
	}
}

function getTypeBody(type, firstNameChild, lastNameChild, isKiso, activities, reservation) {
	if(isKiso) {
		if(type === 'jumprun')
			return htmlJumpRun;
		else
			return htmlKiso;
	} else {
		switch (type) {
			case 'summer':
			case 'music':
			case 'club':
				return htmlStart + firstNameChild + " " + lastNameChild + htmlEnd + getActivityTable(activities) + "<br />" + getReservationTable(reservation) + htmlClose;
				break;
			case 'spiritnight':
				return htmlSpiritnight;
				break;
			default:
				return htmlStart + firstNameChild + " " + lastNameChild + htmlEnd + htmlClose;
				break;
		}
	}
}

function getActivityTable(activities) {
	var tblStart = '<table style="border: 1px solid gray"><tr><th>Programm</th><th>Woche</th><th>Preis</th></tr>';
	var tblEnd = '</table>';
	for(var i=0; i<activities.length; i++) {
		tblStart += '<tr><td>' + activities[i].eventId.location + ' - ' + activities[i].eventId.name + '</td><td>' + activities[i].name + '</td><td>' + activities[i].eventId.feePerWeek + '</td></tr>';
	}
	return tblStart + tblEnd;
}

function getReservationTable(res) {
	var tbleStart = '<table style="border: 1px solid gray">';
	var tbleEnd = '</table>';
	tbleStart += '<tr><td>Vorname</td><td>' + res.firstNameChild + '</td></tr>';
	tbleStart += '<tr><td>Nachname</td><td>' + res.lastNameChild + '</td></tr>';
	tbleStart += '<tr><td>Klasse</td><td>' + res.schoolChild + '</td></tr>';
	tbleStart += '<tr><td>Vorname Eltern</td><td>' + res.firstNameParent + '</td></tr>';
	tbleStart += '<tr><td>Nachname Eltern</td><td>' + res.lastNameParent+ '</td></tr>';
	tbleStart += '<tr><td>Email Eltern</td><td>' + res.emailParent + '</td></tr>';
	tbleStart += '<tr><td>TelNr Eltern</td><td>' + res.phoneNumberParent + '</td></tr>'; 

	return tbleStart + tbleEnd;
}

function getKisoSubject(type) {
	if(type === 'jumprun') {
		return 'Anmeldung / Iscrizione ' + getTypeString(type);
	}
	return 'Anmeldung / Iscrizione KiSo Kindersommer 2017'
}

exports.sendTxtMail = function(recipient, firstNameChild, lastNameChild, type, isKiso, activities, reservation) {
		var body = getTypeBody(type, firstNameChild, lastNameChild, isKiso, activities, reservation);
		var text = getTypeText(type, firstNameChild, lastNameChild, isKiso);
        var fromEmail = isKiso ? 'kiso@jd.bz.it' : 'info@jugenddienst.com';
		var subjectEmail = isKiso ? getKisoSubject(type) : 'Anmeldung ' + getTypeString(type);
		console.log("mail body", body);
		server.send({
		text: text,
		from: fromEmail,
		to: recipient,
		subject: subjectEmail,
		attachment: [{ data: body, alternative: true },
		             { path:"public/assets/jd-logo.png", type:"image/png", headers:{"Content-ID":"<my-image>"} }]
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
