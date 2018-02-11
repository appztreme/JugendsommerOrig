var htmlStart = "<html><body><p>Die Anmeldung f&uuml;r ";
var htmlEnd = " f&uuml;r die Sommerprogramme des Jugenddienstes Bozen Land war erfolgreich.</p><p><strong>Einzahlungsschein wird demn&auml;chst mittels email zugesandt.</strong></p><p>Vielen Dank f&uuml;r die Anmeldung.</p><h3>Zusammenfassung:</h3>";
var htmlClose = "</body></html>";

var htmlSpiritnight = "<html><body><p><strong>Vielen Dank</strong> f&uuml;r die Teilnahme an der SpiritNight 2017!</p><p>Bitte best&auml;tigen Sie die Anmeldung bis zum <strong>31.03.2017</strong> mit einer gesammelten &Uuml;berweisung f&uuml;r die gesamte Pfarrei. Die Gesamtsumme kann an folgende Konten &uuml;berwiesen werden:</p><p>S&uuml;dtiroler Volksbank<br />IBAN: IT42C0585658220070571084313<br />SWIFT/BIC: BPAAIT2BBRE</p><p>S&uuml;dtiroler Sparkasse<br />IBAN: IT62J0604558220000000078000<br />SWIFT/BIC: CRBZIT2B050</p><p>Raiffeisenkasse Eisacktal:<br />IBAN: IT95Y0830759090000301223658<br />SWIFT/BIC: RZSBIT21107</p><p>Bitte geben Sie bei der &Uuml;berweisung <strong>Spiritnight 2017 / Name der Pfarrei</strong> an.</p></body></html>";
var txtSpiritnight = "Vielen Dank für die Teilnahme an der SpiritNight 2017! Bitte bestätigen Sie die Anmeldung bis zum 31.03.2017 mit einer gesammelten Überweisung für die gesamte Pfarrei. Die Gesamtsumme kann an folgende Konten überwiesen werden: Südtiroler Volksbank IBAN: IT42C0585658220070571084313 SWIFT/BIC: BPAAIT2BBRE; Südtiroler Sparkasse IBAN: IT62J0604558220000000078000 SWIFT/BIC: CRBZIT2B050; Raiffeisenkasse Eisacktal IBAN: IT95Y0830759090000301223658 SWIFT/BIC: RZSBIT21107 Bitte geben Sie bei der Überweisung 'Spiritnight 2017 / Name der Pfarrei' an.";

var txtStart = "Die Anmeldung für ";
var txtEnd = " für die Sommerprogramme des Jugenddienstes Bozen Land war erfolgreich. Einzahlungsschein wird demnächst mittels email zugesandt.";

var htmlKiso = "<html><body>Vielen Dank für die Anmeldung Ihres Kindes zum KISO 2017!<br />Sie erhalten innerhalb der n√§chsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.<br />Falls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.<br />Freundliche Grüße,<br />das Jugenddienst Bozen Team<br /><br />Ringraziamo per l'iscrizione di suo/a figlio/a al KISO 2017!<br />Nei prossimi giorni lo Jugenddienst Bozen<br />Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d'attesa.<br />Cordiali saluti,<br />l'equipe dello Jugenddienst Bozen";
var textKiso = "Vielen Dank für die Anmeldung Ihres Kindes zum KISO 2017!\r\nSie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.\r\nFalls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.\r\nFreundliche Grüße, das Jugenddienst Bozen Team \r\n\r\nRingraziamo per l’iscrizione di suo/a figlio/a al KISO 2017!\r\nNei prossimi giorni lo Jugenddienst Bozen Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d‘attesa.\r\nCordiali saluti,\r\nl’equipe dello Jugenddienst Bozen";
var htmlJumpRun = "<html><body>Vielen Dank für die Anmeldung Ihres Kindes zum Jump&Run 2017!<br />Sie erhalten innerhalb der n√§chsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.<br />Falls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.<br />Freundliche Grüße,<br />das Jugenddienst Bozen Team<br /><br />Ringraziamo per l'iscrizione di suo/a figlio/a al Jump&Run 2017!<br />Nei prossimi giorni lo Jugenddienst Bozen<br />Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d'attesa.<br />Cordiali saluti,<br />l'equipe dello Jugenddienst Bozen";
var textJumpRun = "Vielen Dank für die Anmeldung Ihres Kindes zum Jump&Run 2017!\r\nSie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.\r\nFalls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.\r\nFreundliche Grüße, das Jugenddienst Bozen Team \r\n\r\nRingraziamo per l’iscrizione di suo/a figlio/a al Jump&Run 2017!\r\nNei prossimi giorni lo Jugenddienst Bozen Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d‘attesa.\r\nCordiali saluti,\r\nl’equipe dello Jugenddienst Bozen";

exports.getTypeString = function(type) {
	switch (type) {
		case 'summer': return 'Jugendsommer'; break;
		case 'music': return 'Musikwoche'; break;
		case 'spiritnight': return 'SpiritNight'; break;
		case 'club': return 'Jugendraum'; break;
		case 'jumprun': return 'Jump&Run'; break;
		default: return 'Jugendsommer';
	}
}

exports.getTypeText = function(type, firstNameChild, lastNameChild, isKiso) {
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

exports.getTypeBody = function(type, firstNameChild, lastNameChild, isKiso, activities, reservation) {
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
				return htmlStart + firstNameChild + " " + lastNameChild + htmlEnd + getActivityTable(activities) + "<br />" + getReservationTable(reservation) + "<br />" + getJDBLFooter() + htmlClose;
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
	var sum = 0;
	var tblStart = '<table style="border: 1px solid gray; border-collapse: collapse"><tr><th style="border: 1px solid gray">Programm</th><th style="border: 1px solid gray">Woche</th><th style="border: 1px solid gray">Preis</th></tr>';
	var tblEnd = '</table>';
	for(var i=0; i<activities.length; i++) {
		sum += activities[i].eventId.feePerWeek;
		tblStart += '<tr><td style="border: 1px solid gray;">' + activities[i].eventId.location + ' - ' + activities[i].eventId.name + '</td><td style="border: 1px solid gray;">' + activities[i].name + '</td><td style="border: 1px solid gray;">' + activities[i].eventId.feePerWeek + '</td></tr>';
	}
	tblStart += '<tr><td style="border:1px solid gray;"><strong>SUMME</strong></td><td style="border: 1px solid gray;"></td><td style="border: 1px solid gray;">' + sum + '</td></tr>'
	return tblStart + tblEnd;
}

function getReservationTable(res) {
	var tbleStart = '<table style="border: 1px solid gray; border-collapse: collapse;">';
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

function getJDBLFooter() {
	var footer = '<table>';
	footer += '<tr><td><h4>Jugenddienst Bozen-Land</h4></td></tr>';
	footer += '<tr><td>Andreas-Hoferstr.9</td></tr>';
	footer += '<tr><td>39100 Bozen, Südtirol/Italy</td></tr>';
	footer += '<tr><td>St.-Nr.: 94072680211</td></tr>';
	footer += '<tr></tr>';
	footer += '<tr><td><strong>Achtung neu, eigene Email Adresse für Sommerprogramme:</strong></td></tr>';
	footer += '<tr><td>E-Mail: <a mailto="sommer@jugenddienst.com">sommer@jugenddienst.com</a></tr></td>';
	footer += '<tr><td>----------------------------------------------------</td></tr>';
	footer += '<tr><td><strong>Achtung neu, eigenes Sommerkonto:</strong></td></tr>';
	footer += '<tr><td>IBAN: IT 09X 08081 11610 000306005853</td></tr>';
	footer += '<tr><td>----------------------------------------------------</td></tr>';
	footer += '<tr><td><a href="https://www.jdbl.it">www.jdbl.it</a></td></tr>'
	footer += '<tr><td><img src="cid:my-image" width="150" /></td></tr>';
	footer += '</table>';
	return footer;
}

exports.getKisoSubject = function (type) {
	if(type === 'jumprun') {
		return 'Anmeldung / Iscrizione ' + getTypeString(type);
	}
	return 'Anmeldung / Iscrizione KiSo Kindersommer 2017'
}