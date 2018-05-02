const moment = require('moment');

var htmlStart = "<html><body><p>Die Anmeldung f&uuml;r ";
var htmlEnd = " f&uuml;r die Sommerprogramme des Jugenddienstes Bozen Land war erfolgreich.</p><p><strong>Einzahlungsschein wird demn&auml;chst mittels email zugesandt.</strong></p><p>Vielen Dank f&uuml;r die Anmeldung.</p><h3>Zusammenfassung:</h3>";
var htmlClose = "</body></html>";

var htmlSpiritnight = "<html><body><p><strong>Vielen Dank</strong> f&uuml;r die Teilnahme an der SpiritNight 2017!</p><p>Bitte best&auml;tigen Sie die Anmeldung bis zum <strong>31.03.2017</strong> mit einer gesammelten &Uuml;berweisung f&uuml;r die gesamte Pfarrei. Die Gesamtsumme kann an folgende Konten &uuml;berwiesen werden:</p><p>S&uuml;dtiroler Volksbank<br />IBAN: IT42C0585658220070571084313<br />SWIFT/BIC: BPAAIT2BBRE</p><p>S&uuml;dtiroler Sparkasse<br />IBAN: IT62J0604558220000000078000<br />SWIFT/BIC: CRBZIT2B050</p><p>Raiffeisenkasse Eisacktal:<br />IBAN: IT95Y0830759090000301223658<br />SWIFT/BIC: RZSBIT21107</p><p>Bitte geben Sie bei der &Uuml;berweisung <strong>Spiritnight 2017 / Name der Pfarrei</strong> an.</p></body></html>";
var txtSpiritnight = "Vielen Dank für die Teilnahme an der SpiritNight 2017! Bitte bestätigen Sie die Anmeldung bis zum 31.03.2017 mit einer gesammelten Überweisung für die gesamte Pfarrei. Die Gesamtsumme kann an folgende Konten überwiesen werden: Südtiroler Volksbank IBAN: IT42C0585658220070571084313 SWIFT/BIC: BPAAIT2BBRE; Südtiroler Sparkasse IBAN: IT62J0604558220000000078000 SWIFT/BIC: CRBZIT2B050; Raiffeisenkasse Eisacktal IBAN: IT95Y0830759090000301223658 SWIFT/BIC: RZSBIT21107 Bitte geben Sie bei der Überweisung 'Spiritnight 2017 / Name der Pfarrei' an.";

var txtStart = "Die Anmeldung für ";
var txtEnd = " für die Sommerprogramme des Jugenddienstes Bozen Land war erfolgreich. Einzahlungsschein wird demnächst mittels email zugesandt.";

var txtReceipt = "Hallo liebe Eltern,\r\n\r\nanbei findet ihr den Überweisungsschein für das Sommerprogramm 2018.\r\nIhr bekommt für jedes Programm einen eigenen Überweisungsschein mit einer dazugehörigen Überweisungsnummer\r\nFür unser Buchhaltung bitten wir euch, jeden Überweisungsscheinschein extra zu überweisen.\r\nBei der Überweisung bitten wir euch den Gesamtbetrag mit Überweisungsnummer und den Namen der Kinder anzugeben!\r\n\r\nAchtung ein neues Konto:\r\nWir haben für unsere Sommerprogramme ein neues Konto eingerichtet:\r\nKontodaten:Raiffeisenkassa Bozen\r\nIBAN: IT 09X 08081 11610 000306005853";
var htmlReceiptStart = "<html><body><p>Hallo liebe Eltern,<br/ >anbei findet ihr den Überweisungsschein für das Sommerprogramm 2018.<br />Ihr bekommt für jedes Programm einen eigenen Überweisungsschein mit einer dazugehörigen Überweisungsnummer.<br />Für unser Buchhaltung bitten wir euch, jeden Überweisungsschein extra zu überweisen.<br />Bei der Überweisung bitten wir euch den <strong>Gesamtbetrag</strong> mit der <strong>Überweisungsnummer</strong> und den <strong>Namen der Kinder</strong> anzugeben!<br /><br />Achtung ein neues Konto:<br />Wir haben für unsere Sommerprogramme ein neues Konto eingerichtet.<br /><strong>Kontodaten:<br />Raiffeisenkassa Bozen<br />IBAN: IT 09X 08081 11610 000306005853</strong><br />";
var htmlReceiptEnd = "</body></html>";

var txtStartJDUL_de = "Anmeldebestätigung./r/nes freut uns, dass du heuer im Sommer bei unserem JD-SUMMER Programm in ";
var txtEndJDUL_de = " dabei sein wirst!/r/nDu erhältst in der nächsten Zeit noch eine weitere E-Mail mit detaillierteren Informationen./r/nDeine Eltern sind gebeten die untenstehenden Daten zu kontrollieren und die Teilnahmegebühr bis zum 31.03.2018 auf folgendes Konto zu überweisen:/r/nJugenddienst Unterland – Raiffeisenkasse Salurn/r/nIBAN: IT 27 T 08220 58371000304204042/r/nmit dem Betreff: Nachname Vorname Wohnort./r/nWir freuen uns jetzt schon auf den JD-SUMMER mit dir, hoffen auf schönes Wetter und wünschen euch noch eine tolle Zeit bis zum Sommer."
var txtStartJDUL_it = "Conferma d‘iscrizione./r/nSiamo contenti che parteciperai al nostro programma JD-SUMMER a ";
var txtEndJDUL_it = " Nei prossimi tempi riceverai un’altra e-mail con ulteriori informazioni./r/nI tuoi genitori sono pregati di controllare i dati sottostanti e di versare la quota d'iscrizione sul nostro conto corrente entro il 31.03.2018:/r/nJugenddienst Unterland – Raiffeisenkasse Salurn/r/nIBAN: IT 27 T 08220 58371000304204042/r/ncon l‘oggetto: Nachname Vorname Wohnort./r/nNon vediamo l’ora che l’estate inizi a gonfie vele e speriamo in un bel tempo. Nel frattempo vi auguriamo tanto divertimento";
var htmlStartJDUL_de = "<html><body><h2>Anmeldebestätigung</h2>Liebe/r ";
var htmlMiddleJDUL_de = ",<br />es freut uns, dass du heuer im Sommer bei unserem JD-SUMMER Programm in  ";
var htmlEndJDUL_de = " dabei sein wirst!<br />Du erhältst in der nächsten Zeit noch eine weitere E-Mail mit detaillierteren Informationen.<br /><br />Deine Eltern sind gebeten die untenstehenden Daten zu kontrollieren und die Teilnahmegebühr bis zum <strong>31.03.2018</strong> auf folgendes Konto zu überweisen:<br /><br />Jugenddienst Unterland – Raiffeisenkasse Salurn<br />IBAN: IT 27 T 08220 58371000304204042<br />mit dem Betreff: Nachname Vorname Wohnort<br /><br />Wir freuen uns jetzt schon auf den JD-SUMMER mit dir, hoffen auf schönes Wetter und wünschen euch noch eine tolle Zeit bis zum Sommer.<br /><br />Euer Jugenddienst Unterland Team";
var htmlFinalJDUL = "</body></html>";
var htmlStartJDUL_it = "<h2>Conferma d‘iscrizione</h2>Cara/o ";
var htmlMiddleJDUL_it = ",<br />Siamo contenti che parteciperai al nostro programma JD-SUMMER a ";
var htmlEndJDUL_it = ".<br />Nei prossimi tempi riceverai un'altra e-mail con ulteriori informazioni.<br /><br />I tuoi genitori sono pregati di controllare i dati sottostanti e di versare la quota d'iscrizione sul nostro conto corrente entro il <strong>31.03.2018:</strong><br /><br />Jugenddienst Unterland – Raiffeisenkasse Salurn<br />IBAN: IT 27 T 08220 58371000304204042<br />con l‘oggetto: cognome nome comune di residenza<br /><br />Non vediamo l'ora che il JD-SUMMER inizi a gonfie vele e speriamo in un bel tempo. Nel frattempo vi auguriamo tanto divertimento.<br /><br />Il Vostro Team del Jugenddienst Unterland";

var htmlKiso = "<html><body>Vielen Dank für die Anmeldung Ihres Kindes zum KISO 2018!<br />Sie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.<br />Falls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.<br />Freundliche Grüße,<br />das Jugenddienst Bozen Team<br /><br />Ringraziamo per l'iscrizione di suo/a figlio/a al KISO 2018!<br />Nei prossimi giorni lo Jugenddienst Bozen<br />Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d'attesa.<br />Cordiali saluti,<br />l'equipe dello Jugenddienst Bozen";
var textKiso = "Vielen Dank für die Anmeldung Ihres Kindes zum KISO 2018!\r\nSie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.\r\nFalls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.\r\nFreundliche Grüße, das Jugenddienst Bozen Team \r\n\r\nRingraziamo per l’iscrizione di suo/a figlio/a al KISO 2018!\r\nNei prossimi giorni lo Jugenddienst Bozen Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d‘attesa.\r\nCordiali saluti,\r\nl’equipe dello Jugenddienst Bozen";
var htmlJumpRun = "<html><body>Vielen Dank für die Anmeldung Ihres Kindes zum Jump&Run 2018!<br />Sie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.<br />Falls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.<br />Freundliche Grüße,<br />das Jugenddienst Bozen Team<br /><br />Ringraziamo per l'iscrizione di suo/a figlio/a al Jump&Run 2018!<br />Nei prossimi giorni lo Jugenddienst Bozen<br />Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d'attesa.<br />Cordiali saluti,<br />l'equipe dello Jugenddienst Bozen";
var textJumpRun = "Vielen Dank für die Anmeldung Ihres Kindes zum Jump&Run 2018!\r\nSie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.\r\nFalls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.\r\nFreundliche Grüße, das Jugenddienst Bozen Team \r\n\r\nRingraziamo per l’iscrizione di suo/a figlio/a al Jump&Run 2018!\r\nNei prossimi giorni lo Jugenddienst Bozen Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d‘attesa.\r\nCordiali saluti,\r\nl’equipe dello Jugenddienst Bozen";

var htmlJSGries = "";
var textJSGries = "";

function getTypeString(type) {
	switch (type) {
		case 'summer': return 'Jugendsommer'; break;
		case 'music': return 'Musikwoche'; break;
		case 'spiritnight': return 'SpiritNight'; break;
		case 'club': return 'Jugendraum'; break;
		case 'jumprun': return 'Jump&Run'; break;
		case 'receipt': return 'Rechnung'; break;
		default: return 'Jugendsommer';
	}
}

exports.getSender = function(instance) {
	if(instance.isKiso) return 'kiso@jd.bz.it';
	else if(instance.isJugendsommer) return 'sommer@jugenddienst.com';
	else if(instance.isJDBL) return 'info@jugenddienst.com';
	else if(instance.isJDUL) return 'unterland@jugenddienst.it';
	else if(instance.isJSGries) return 'Kathi14be@gmail.com';
	else return 'info@jugenddienst.com';
}

function getKisoSubject(type) {
	if(type === 'jumprun') {
		return 'Anmeldung / Iscrizione ' + getTypeString(type);
	}
	return 'Anmeldung / Iscrizione KiSo Kindersommer 2017'
}

exports.getSubject = function(instance, type) {
	if(instance.isKiso) return getKisoSubject(type);
	else if(instance.isJDUL) return "Anmeldung | iscrizione JD-SUMMER";
	else if(instance.isJSGries) return "Anmeldung";
	else {
		if(type === 'receipt') return 'Überweisung Sommer';
		else return 'Anmeldung ' + getTypeString(type);
	}
}

exports.getTypeText = function(type, firstNameChild, lastNameChild, location, instance) {
	if(instance.isKiso) {
		if(type === 'jumprun')
			return textJumpRun;
		else
			return textKiso;
	} else if(instance.isJDUL) {
		return txtStartJDUL_de + location + txtEndJDUL_de + "/r/n/r/n" + txtStartJDUL_it + location + txtEndJDUL_it;
	} else if(instance.isJSGries) {
		return textJSGries;
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

exports.getAttachment = function(body, instance) {
	if(instance.isJDBL || instance.isJugendsommer) {
		return [{ data: body, alternative: true },
			    { path:"public/assets/jdbl-logo.jpg", type:"image/jpg", headers:{"Content-ID":"<my-image>"} }]
	}
	else if (instance.isJDUL) {
		return [{ data: body, alternative: true },
			{ path:"public/assets/jdul_ente.jpg", type:"image/jpg", headers:{"Content-ID":"<my-image>"} }]
	} else {
		return [{ data: body, alternative: true }];
	}
}

exports.getTypeBody = function(type, firstNameChild, lastNameChild, activities, reservation, instance) {
	// console.log(instance, "platform")
	if(instance.isKiso) {
		if(type === 'jumprun')
			return htmlJumpRun;
		else
			return htmlKiso;
	}
	else if (instance.isJDUL) {
		return htmlStartJDUL_de + firstNameChild + htmlMiddleJDUL_de + activities[0].eventId.location + htmlEndJDUL_de + "<br />" +
			   htmlStartJDUL_it + firstNameChild + htmlMiddleJDUL_it + activities[0].eventId.location_it + htmlEndJDUL_it + "<br /><br />" +
		   getActivityTable(activities) + "<br /><br />" + getReservationTable(reservation) + "<br /><br />" + getJDULFooter() + "<br />" + htmlFinalJDUL;
	}
	else if(instance.isJSGries) {
		return htmlJSGries;
	}
	else {
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

exports.getReceiptBody = function(reservations, rnumber) {
	// return htmlReceiptStart + "<br /><br />" + "<br />" + getJDBLFooter() + "<br />" + htmlReceiptEnd;
	return htmlReceiptStart + "<br /><br />" + getReceiptTable(reservations, rnumber) + "<br />" + getJDBLFooter() + "<br />" + htmlReceiptEnd;
}

exports.getSorryText = function() {
	return "Liebe Eltern,/r/nim automatisch generierten Überweisungsemail hat sich ein Fehler in der Berechnung der Kosten eingeschlichen. Bitte das letzte Email ignorieren./r/nAm Sonntag den 10. März wird eine korrigierte Version versendet./r/nEntschuldigung für die entstandene Verwirrung./r/n";
}

exports.getSorryHtml = function() {
	return "<html><body><p>Liebe Eltern,<br />im automatisch generierten Überweisungsemail hat sich ein Fehler in der Berechnung der Kosten eingeschlichen. Bitte das letzte Email ignorieren.<br />Am Sonntag den 10. März wird eine korrigierte Version versendet.<br />Entschuldigung für die entstandene Verwirrung.</p><br />"
		   + getJDBLFooter();

}

exports.getReceiptTxt = function () {
	return txtReceipt;
}

function calculateFee(activity) {
	if(activity.eventId.deadline) {
		if((moment(activity.eventId.deadline).hour(23).minute(59).second(59)).isBefore(moment())) return activity.eventId.feePerWeek + activity.eventId.penalty;
		return activity.eventId.feePerWeek;
	}
	return activity.eventId.feePerWeek;
}

function calculateReceiptFee(reservation, activity) {
	if(activity.eventId.deadline) {
		if((moment(activity.eventId.deadline).hour(23).minute(59).second(59)).isBefore(moment(reservation.registrationDate))) return activity.eventId.feePerWeek + activity.eventId.penalty;
		return activity.eventId.feePerWeek;
	}
	return activity.eventId.feePerWeek;
}

function getActivityTable(activities) {
	var sum = 0;
	var tblStart = '<table style="border: 1px solid gray; border-collapse: collapse"><tr><th style="border: 1px solid gray; padding: 2px;">Programm | programma</th><th style="border: 1px solid gray; padding: 2px;">Woche | settimana</th><th style="border: 1px solid gray; padding: 2px;">Preis | prezzo in €</th></tr>';
	var tblEnd = '</table>';
	for(var i=0; i<activities.length; i++) {
		sum += calculateFee(activities[i]);
		tblStart += '<tr><td style="border: 1px solid gray; padding: 2px;">' + activities[i].eventId.location + ' - ' + activities[i].eventId.name + '<br />' + activities[i].eventId.location_it + ' - ' + activities[i].eventId.name_it + '</td><td style="border: 1px solid gray; padding: 2px">' + activities[i].name + '<br />' + activities[i].name_it + '</td><td style="border: 1px solid gray; padding: 2px;">' + calculateFee(activities[i]) + '</td></tr>';
	}
	tblStart += '<tr><td style="border:1px solid gray; padding: 2px;"><strong>Summe | somma in €</strong></td><td style="border: 1px solid gray;"></td><td style="border: 1px solid gray; padding: 2px;"><strong>' + sum + '</strong></td></tr>'
	return tblStart + tblEnd;
}

function getReceiptTable(res, rnumber) {
	var sum = 0;
	var tblStart = '<p>Ihre Überweisungsnummer: <strong>' + rnumber + '</strong></p>';
	tblStart += '<table style="border: 1px solid gray; border-collapse: collapse"><tr><th style="border: 1px solid gray; padding: 2px;">Programm | programma</th><th style="border: 1px solid gray; padding: 2px;">Woche | settimana</th><th style="border: 1px solid gray; padding: 2px;">Name | nome</th><th style="border: 1px solid gray; padding: 2px;">Preis | prezzo in €</th></tr>';
	var tblEnd = '</table>';
	for(var i=0; i<res.length; i++) {
		var fee = calculateReceiptFee(res[i], res[i].activityId);
		sum += fee;
		//console.log("sum", sum);
		tblStart += '<tr><td style="border: 1px solid gray; padding: 2px;">' + res[i].activityId.eventId.location + ' - ' + res[i].activityId.eventId.name + '<br />' + res[i].activityId.eventId.location_it + ' - ' + res[i].activityId.eventId.name_it + '</td><td style="border: 1px solid gray; padding: 2px">' + res[i].activityId.name + '<br />' + res[i].activityId.name_it + '</td><td style="border: 1px solid gray; padding: 2px;">' + res[i].firstNameChild + ' ' + res[i].lastNameChild +'</td><td style="border: 1px solid gray; padding: 2px;">' + fee + '</td></tr>';
		//console.log("html", tblStart);
	}
	tblStart += '<tr><td style="border:1px solid gray; padding: 2px;"><strong>Summe | somma in €</strong></td><td style="border: 1px solid gray;"></td><td style="border: 1px solid gray;"></td><td style="border: 1px solid gray; padding: 2px;">' + sum + '</td></tr>'
	return tblStart + tblEnd;
}

function getReservationTable(res) {
	var tbleStart = '<table style="border: 1px solid gray; border-collapse: collapse;">';
	var tbleEnd = '</table>';
	tbleStart += '<tr><td style="padding: 2px">Vorname | nome</td><td style="padding: 2px">' + res.firstNameChild + '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Nachname | cognome</td><td style="padding: 2px">' + res.lastNameChild + '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Geburtsdatum | data di nascita</td><td style="padding: 2px">' + (new Date(res.birthdayChild)).toISOString().substring(0, 10) + '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Besuchte Klasse | classe frequentata</td><td style="padding: 2px">' + res.schoolChild + '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Vorname Eltern | nome genitori</td><td style="padding: 2px">' + res.firstNameParent + '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Nachname Eltern | cognome genitori</td><td style="padding: 2px">' + res.lastNameParent+ '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Email</td><td style="padding: 2px">' + res.emailParent + '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Telefon</td><td style="padding: 2px">' + res.phoneNumberParent + '</td></tr>'; 

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

function getJDULFooter() {
	var footer = '<table>';
	footer += '<tr><td><h4>JUGENDDIENST UNTERLAND</h4></td></tr>';
	footer += '<tr><td>Widumdurchgang Nr. 1</td></tr>';
	footer += '<tr><td>39044 Neumarkt</td></tr>';
	footer += '<tr><td>Tel.: 0471 812717</td></tr>';
	footer += '<tr><td>unterland@jugenddienst.it</td></tr>';
	footer += '<tr><td><a href="https://www.jugenddienst.it/unterland">www.jugenddienst.it/unterland</a></td></tr>';
	footer += '<tr></tr>';
	footer += '<tr><td>IBAN: IT27T0822058371000304204042</td></tr>';
	footer += '<tr></tr>';
	footer += '<tr><td><img src="cid:my-image" width="150" /></td></tr>';
	footer += '</table>';
	return footer;
}