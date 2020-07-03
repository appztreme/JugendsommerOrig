const moment = require('moment');
const pdf = require('pdfkit');
const fs = require('fs');

var htmlStart = "<html><body><p>Die Anmeldung f&uuml;r ";
var htmlEnd = " f&uuml;r die Sommerprogramme des Jugenddienstes Bozen-Land war <strong>erfolgreich</strong>.</p><p style='color:#ffa500'><strong>Einzahlungsschein wird in den nächsten Tagen mittels Email zugesandt.</strong></p><p>Vielen Dank f&uuml;r die Anmeldung.</p><h3>Zusammenfassung:</h3>";
var htmlClose = "</body></html>";

var htmlStartWait = "<html><body><p>Die Anmeldung f&uuml;r ";
var htmlEndWait = " f&uuml;r die Sommerprogramme des Jugenddienstes Bozen-Land war <strong>erfolgreich</strong>.</p><p>Momentan befindet sich die Anmeldung auf der <strong style='color:#ffa500'>Warteliste</strong>. Sollten Sie im M$auml;rz einen Einzahlungsschein mittels Mail erhalten, ist die Anmeldung definitiv.</p><p>Vielen Dank f&uuml;r die Anmeldung.</p><h3>Zusammenfassung:</h3>";
var htmlCloseWait = "</body></html>";

var htmlSpiritnight = "<html><body><p><strong>Vielen Dank</strong> f&uuml;r die Teilnahme an der SpiritNight 2020!</p><p>Bitte best&auml;tigen Sie die Anmeldung bis zum <strong>31.03.2020</strong> mit einer gesammelten &Uuml;berweisung f&uuml;r die gesamte Pfarrei. Die Gesamtsumme kann an folgende Konten &uuml;berwiesen werden:</p><p>S&uuml;dtiroler Volksbank<br />IBAN: IT42C0585658220070571084313<br />SWIFT/BIC: BPAAIT2BBRE</p><p>S&uuml;dtiroler Sparkasse<br />IBAN: IT62J0604558220000000078000<br />SWIFT/BIC: CRBZIT2B050</p><p>Raiffeisenkasse Eisacktal:<br />IBAN: IT95Y0830759090000301223658<br />SWIFT/BIC: RZSBIT21107</p><p>Bitte geben Sie bei der &Uuml;berweisung <strong>Spiritnight 2017 / Name der Pfarrei</strong> an.</p></body></html>";
var txtSpiritnight = "Vielen Dank für die Teilnahme an der SpiritNight 2020! Bitte bestätigen Sie die Anmeldung bis zum 31.03.2020 mit einer gesammelten Überweisung für die gesamte Pfarrei. Die Gesamtsumme kann an folgende Konten überwiesen werden: Südtiroler Volksbank IBAN: IT42C0585658220070571084313 SWIFT/BIC: BPAAIT2BBRE; Südtiroler Sparkasse IBAN: IT62J0604558220000000078000 SWIFT/BIC: CRBZIT2B050; Raiffeisenkasse Eisacktal IBAN: IT95Y0830759090000301223658 SWIFT/BIC: RZSBIT21107 Bitte geben Sie bei der Überweisung 'Spiritnight 2017 / Name der Pfarrei' an.";

var txtStart = "Die Anmeldung für ";
var txtEnd = " für die Sommerprogramme des Jugenddienstes Bozen-Land war erfolgreich. Einzahlungsschein wird in den nächsten Tagen mittels Email zugesandt.\r\nVielen Dank für die Anmeldung.";
var txtStartWait = "Die Anmeldung für ";
var txtEndWait = " für die Sommerprogramme des Jugenddienstes Bozen-Land war erfolgreich. Momentan befindet sich die Anmeldung auf der Warteliste. Sollten Sie im März einen Einzahlungsschein mittels Mail erhalten, ist die Anmeldung definitiv.\r\nVielen Dank für die Anmeldung.";

var txtReceipt = "Hallo liebe Eltern,\r\n\r\nanbei findet ihr den Überweisungsschein für das Sommerprogramm 2020.\r\nIhr bekommt für jedes Programm einen eigenen Überweisungsschein mit einer dazugehörigen Überweisungsnummer\r\nFür unsere Buchhaltung bitten wir euch, jeden Überweisungsscheinschein extra zu überweisen und nicht Sammelüberweisungen (z.B. Kindersommer und Jugendsommer zusammen) zu tätigen.\r\nBei der Überweisung bitte die Überweisungsnummer und den Namen des Kindes angeben.\r\nEinzahlungsfrist ist der 12. Juni. Sollte bis dahin nicht überwiesen sein, wird die Anmeldung gelöscht.\r\nKontodaten:Raiffeisenkassa Bozen\r\nIBAN: IT 09X 08081 11610 000306005853";
var htmlReceiptStart = "<html><body><p>Hallo liebe Eltern,<br/ >anbei findet ihr den Überweisungsschein für das Sommerprogramm 2020.<br />Ihr bekommt für jedes Programm <strong>einen eigenen Überweisungsschein</strong> mit einer dazugehörigen Überweisungsnummer.<br />Für unsere Buchhaltung bitten wir euch, jeden Überweisungsschein extra zu überweisen und nicht Sammelüberweisungen (z.B. Kindersommer und Jugendsommer zusammen) zu tätigen.<br /></strong>Bei der Überweisung bitte die <span style='color:#ffa500'><strong>Überweisungsnummer und den Namen des Kindes angeben</strong></span>.<br /><strong>Einzahlungsfrist</strong> ist der <strong>12. Juni</strong>. Sollte bis dahin nicht überwiesen sein, wird die Anmeldung gelöscht.<br /><span style='color:#ffa500'><strong>Überweisungsschein:</strong></span><br />Kontodaten:<br /><strong>Raiffeisenkassa Bozen<br />IBAN: IT 09X 08081 11610 000306005853</strong><br />";
var htmlReceiptEnd = "</body></html>";

var txtReminder = "Hallo liebe Eltern,\r\n\r\nbei der Kontrolle unserer Buchhaltung ist uns aufgefallen, dass Ihre Einzahlung für unsere Sommerprogramme nocht nicht auf unserem Konto eingegangen ist.\r\nWir bitten dies so schnell wie möglich nachzuholen ansonsten wird die Anmeldung gelöscht.";
var htmlReminderStart = "<html><body><p>Hallo liebe Eltern,<br />bei der Kontrolle unserer Buchhaltung ist uns aufgefallen, dass Ihre Einzahlung für unsere Sommerprogramme nocht nicht auf unserem Konto eingegangen ist.<br />Wir bitten dies so schnell wie möglich nachzuholen ansonsten wird die Anmeldung gelöscht.</p>";
var htmlReminderEnd = "</body></html>";

var textConfirmation = "Hallo liebe Eltern,\r\n\r\nim Anhang findet ihr nochmals die Einzahlungsbestätigung eurer Anmeldungen.\r\n\r\nWir hoffen die Programme waren zu eurer Zufriedenheit und wir freuen uns auf eure Anmeldungen im nächsten Jahr.\r\nDieses sind nun, wie von einigen Eltern erwünscht, mit dem genauen Datum der Teilnahme versehen.\r\nMit freundlichen Grüßen\r\n\r\nGünther Reichhalter";
var htmlConfirmation = "<html><body><p>Hallo liebe Eltern,<br />im Anhang findet ihr <strong>nochmals</strong> die Einzahlungsbestätigung eurer Anmeldungen.<br />Dieses sind nun, wie von einigen Eltern erwünscht, mit dem genauen Datum der Teilnahme versehen.<br />Wir hoffen die Programme waren zu eurer Zufriedenheit und wir freuen uns auf eure Anmeldungen im nächsten Jahr.<br /><br />Mit freundlichen Grüßen<br />Günther Reichhalter</p></body></html>"


var txtStartJDUL_de = "Anmeldebestätigung./r/nes freut uns, dass du heuer im Sommer bei unserem JD-SUMMER Programm in ";
var txtEndJDUL_de = " dabei sein wirst!/r/nDu erhältst innerhalb Mai noch eine weitere E-Mail mit detaillierteren Informationen./r/nDeine Eltern sind gebeten die untenstehenden Daten zu kontrollieren und die Teilnahmegebühr bis zum 20.03.2020 auf folgendes Konto zu überweisen:/r/nJugenddienst Unterland – Raiffeisenkasse Salurn/r/nIBAN: IT 27 T 08220 58371000304204042/r/nmit dem Betreff: Nachname Vorname Wohnort./r/nWir freuen uns jetzt schon auf den JD-SUMMER mit dir, hoffen auf schönes Wetter und wünschen euch noch eine tolle Zeit bis zum Sommer."
var txtStartJDUL_it = "Conferma d‘iscrizione./r/nSiamo contenti che parteciperai al nostro programma JD-SUMMER a ";
var txtEndJDUL_it = " Entro maggio riceverai un'altra e-mail con ulteriori informazioni./r/nI tuoi genitori sono pregati di controllare i dati sottostanti e di versare la quota d'iscrizione sul nostro conto corrente entro il 20.03.2020:/r/nJugenddienst Unterland – Raiffeisenkasse Salurn/r/nIBAN: IT 27 T 08220 58371000304204042/r/ncon l‘oggetto: Nachname Vorname Wohnort./r/nNon vediamo l’ora che l’estate inizi a gonfie vele e speriamo in un bel tempo. Nel frattempo vi auguriamo tanto divertimento";
var htmlStartJDUL_de = "<html><body><h2>Daten in Bearbeitung JD-Summer</h2>Liebe/r ";
var htmlMiddleJDUL_de = ",<br />Vielen Dank für deine Anmeldung.<br />Deine Eltern erhalten innerhalb 08.06.2020 noch eine schriftliche Benachrichtigung von uns, ob du einen Platz erhalten hast.";
var htmlEndJDUL_de = "<br />Bei dieser Gelegenheit werden wir euch auch die Zahlungsmodalitäten mitteilen. Außerdem bitten wir deine Eltern, die untenstehenden Daten zu kontrollieren:<br /><br />In der Zwischenzeit wünschen wir euch alles Gute und bis bald<br />Herzliche Grüße<br /> Das Team vom Jugenddienst Unterland";
var htmlFinalJDUL = "</body></html>";
var htmlStartJDUL_it = "<h2>elaborazione dei dati JD-Summer</h2>Cara/o ";
var htmlMiddleJDUL_it = ",<br />Grazie mille per l’iscrizione.<br />I tuoi genitori riceveranno entro l'08.06.2020 una conferma di avvenuta iscrizione, se hai ottenuto un posto.";
var htmlEndJDUL_it = ".<br />In quell’occasione vi comunicheremo anche le modalità di pagamento. Inoltre preghiamo i genitori di controllare i dati sottostanti.<br /><br />Nel frattempo, vi auguriamo tutto il bene e a presto.<br />Cordiali saluti<br />Il Team del<br />Jugenddienst Unterland";
// var htmlStartJDUL_de = "<html><body><h2>Anmeldebestätigung</h2>Liebe/r ";
// var htmlMiddleJDUL_de = ",<br />es freut uns, dass du heuer im Sommer bei unserem JD-SUMMER Programm in  ";
// var htmlEndJDUL_de = " dabei sein wirst!<br />Du erhältst innerhalb Mai noch eine weitere E-Mail mit detaillierteren Informationen.<br /><br />Deine Eltern sind gebeten die untenstehenden Daten zu kontrollieren und die Teilnahmegebühr bis zum <strong>20.03.2020</strong> auf folgendes Konto zu überweisen:<br /><br />Jugenddienst Unterland – Raiffeisenkasse Salurn<br />IBAN: IT 27 T 08220 58371000304204042<br />mit dem Betreff: Nachname Vorname Wohnort<br /><br />Wir freuen uns jetzt schon auf den JD-SUMMER mit dir, hoffen auf schönes Wetter und wünschen euch noch eine tolle Zeit bis zum Sommer.<br /><br />Euer Jugenddienst Unterland Team";
// var htmlFinalJDUL = "</body></html>";
// var htmlStartJDUL_it = "<h2>Conferma d‘iscrizione</h2>Cara/o ";
// var htmlMiddleJDUL_it = ",<br />Siamo contenti che parteciperai al nostro programma JD-SUMMER a ";
// var htmlEndJDUL_it = ".<br />Entro maggio riceverai un'altra e-mail con ulteriori informazioni.<br /><br />I tuoi genitori sono pregati di controllare i dati sottostanti e di versare la quota d'iscrizione sul nostro conto corrente entro il <strong>20.03.2020:</strong><br /><br />Jugenddienst Unterland – Raiffeisenkasse Salurn<br />IBAN: IT 27 T 08220 58371000304204042<br />con l‘oggetto: cognome nome comune di residenza<br /><br />Non vediamo l'ora che il JD-SUMMER inizi a gonfie vele e speriamo in un bel tempo. Nel frattempo vi auguriamo tanto divertimento.<br /><br />Il Vostro Team del Jugenddienst Unterland";
var txtWaitingListJDUL = "Guten Tag,/r/nleider ist das von Ihnen gewünschte Programm bereits ausgebucht./r/nSie sind jedoch auf der Warteliste. Sollte ein Platz frei werden, melden wir uns innerhalb 20.03.2020 bei Ihnen./r/nMit freundlichen Grüßen/r/nDas Team des Jugenddienst Unterland/r/n/r/n/r/n";
var txtWaitingListJDUL_it = "Buon giorno,/r/npurtroppo è già pieno il programma da lei scelto./r/nLa sua iscrizione si trova sulla lista d‘ attesa. Se dovesse liberarsi un posto, La contatteremmo entro il  20.03.2020./r/nCordiali saluti/r/nIl Team del Jugenddienst Unterland";
var htmlWaitingListJDUL = "<html><body>Guten Tag,<br />leider ist das von Ihnen gewünschte Programm bereits ausgebucht.<br />Sie sind jedoch auf der Warteliste. Sollte ein Platz frei werden, melden wir uns innerhalb 20.03.2020 bei Ihnen.<br />Mit freundlichen Grüßen<br />Das Team des Jugenddienst Unterland<br /><br /><br />";
var htmlWaitingListJDUL_it = "Buon giorno,<br />purtroppo è già pieno il programma da lei scelto.<br />La sua iscrizione si trova sulla lista d‘ attesa. Se dovesse liberarsi un posto, La contatteremmo entro il  20.03.2020.<br />Cordiali saluti<br />Il Team del Jugenddienst Unterland</body></html>";

var htmlKiso = "<html><body>Vielen Dank für die Anmeldung Ihres Kindes zum KISO 2020!<br />Sie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.<br />Falls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.<br />Freundliche Grüße,<br />das Jugenddienst Bozen Team<br /><br />Ringraziamo per l'iscrizione di suo/a figlio/a al KISO 2020!<br />Nei prossimi giorni lo Jugenddienst Bozen<br />Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d'attesa.<br />Cordiali saluti,<br />l'equipe dello Jugenddienst Bozen";
var textKiso = "Vielen Dank für die Anmeldung Ihres Kindes zum KISO 2020!\r\nSie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.\r\nFalls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.\r\nFreundliche Grüße, das Jugenddienst Bozen Team \r\n\r\nRingraziamo per l’iscrizione di suo/a figlio/a al KISO 2020!\r\nNei prossimi giorni lo Jugenddienst Bozen Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d‘attesa.\r\nCordiali saluti,\r\nl’equipe dello Jugenddienst Bozen";
var htmlKisoSP = "<html><body>Vielen Dank für die Anmeldung Ihres Kindes zum Sommerprojekt von 11-15 Jahren 2020!<br />Sie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.<br />Falls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.<br />Freundliche Grüße,<br />das Jugenddienst Bozen Team<br /><br />Ringraziamo per l'iscrizione di suo/a figlio/a al progetti estivi dagli 11 ai 15 anni 2020!<br />Nei prossimi giorni lo Jugenddienst Bozen<br />Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d'attesa.<br />Cordiali saluti,<br />l'equipe dello Jugenddienst Bozen";
var textKisoSP = "Vielen Dank für die Anmeldung Ihres Kindes zum Sommerprojekte von 11-15 Jahren 2020!\r\nSie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.\r\nFalls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.\r\nFreundliche Grüße, das Jugenddienst Bozen Team \r\n\r\nRingraziamo per l’iscrizione di suo/a figlio/a al progetti estivi dagli 11 ai 15 anni 2020!\r\nNei prossimi giorni lo Jugenddienst Bozen Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d‘attesa.\r\nCordiali saluti,\r\nl’equipe dello Jugenddienst Bozen"
var htmlJumpRun = "<html><body>Vielen Dank für die Anmeldung Ihres Kindes zum Jump&Run 2020!<br />Sie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.<br />Falls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.<br />Freundliche Grüße,<br />das Jugenddienst Bozen Team<br /><br />Ringraziamo per l'iscrizione di suo/a figlio/a al Jump&Run 2020!<br />Nei prossimi giorni lo Jugenddienst Bozen<br />Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d'attesa.<br />Cordiali saluti,<br />l'equipe dello Jugenddienst Bozen";
var textJumpRun = "Vielen Dank für die Anmeldung Ihres Kindes zum Jump&Run 2020!\r\nSie erhalten innerhalb der nächsten Tage eine Rückmeldung vom Jugenddienst Bozen zu Ihrem Anmeldestand.\r\nFalls das Gruppenlimit für die betreffende Woche bereits erreicht sein sollte, kommt Ihr Kind auf die Warteliste.\r\nFreundliche Grüße, das Jugenddienst Bozen Team \r\n\r\nRingraziamo per l’iscrizione di suo/a figlio/a al Jump&Run 2020!\r\nNei prossimi giorni lo Jugenddienst Bozen Le invierà una risposta sullo stato di iscrizione. Se i posti disponibli per la settimana interessata dovessero già essere esauriti, suo/a figlio/a sarà messo/a sulla lista d‘attesa.\r\nCordiali saluti,\r\nl’equipe dello Jugenddienst Bozen";

var htmlJSGries = "<html><body>Vielen Dank für die Anmeldung Ihres Kindes zum Zeltlager der Jungschar Gries.<br />Für die vollständige Anmeldung bitte die Überweisungsbestätigung per Email zustellen an Kathi14be@gmail.com<br />Das Konto lautet:<br />Katholische Jungschar Südtirols<br />Ortsgruppe Gries<br />IBAN: IT 59 N 08081 11601 000301002490<br/>Bei Fragen oder Unklarheiten können Sie sich jederzeit an uns wenden: 340 4910415 (Katharina Berger)<br /></body></html>";
var textJSGries = "Vielen Dank für die Anmeldung Ihres Kindes zum Zeltlager der Jungschar Gries.\r\nFür die vollständige Anmeldung bitte die Überweisungsbestätigung per Email zustellen an Kathi14be@gmail.com\r\nDas Konto lautet:\r\nKatholische Jungschar Südtirols\r\nOrtsgruppe Gries\r\nIBAN: IT 59 N 08081 11601 000301002490\r\nBei Fragen oder Unklarheiten können Sie sich jederzeit an uns wenden: 340 4910415 (Katharina Berger)\r\n";

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
	return 'Anmeldung / Iscrizione KiSo Kindersommer 2020'
}

exports.getSubject = function(instance, type) {
	if(instance.isKiso) return getKisoSubject(type);
	else if(instance.isJDUL) return "Anmeldung | iscrizione JD-SUMMER";
	else if(instance.isJSGries) return "Anmeldung";
	else {
		if(type === 'receipt') return 'Überweisung Sommer';
		else if(type === 'reminder') return 'Erinnerung';
		else if(type === 'confirmation') return 'Bestätigung';
		else return 'Anmeldung ' + getTypeString(type);
	}
}

exports.getTypeText = function(type, firstNameChild, lastNameChild, location, instance, activities) {
	if(instance.isKiso) {
		if(type === 'jumprun')
			return textJumpRun;
		else {
			if(activities[0].eventId.name.startsWith("KiSo")) return textKiso;
			return textKisoSP;
		}
			return textKiso;
	} else if(instance.isJDUL) {
		if(activities[0].maxParticipants <= activities[0].currentParticipants) { //child on waiting list
			return txtWaitingListJDUL + txtWaitingListJDUL_it;
		} else { // regular reservation
			return txtStartJDUL_de + location + txtEndJDUL_de + "/r/n/r/n" + txtStartJDUL_it + location + txtEndJDUL_it;
		}
	} else if(instance.isJSGries) {
		return textJSGries;
	} else {
		switch (type) {
			case 'summer':
			case 'music':
			case 'club':
			case 'bike':
				if(activities[0].maxParticipants <= activities[0].currentParticipants) { //child on waiting list
					return txtStartWait + firstNameChild + " " + lastNameChild + txtEndWait;
				} else { // regular reservation
					return txtStart + firstNameChild + " " + lastNameChild + txtEnd;
				}
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

const getChildStr = (child) => {
	return child.firstNameChild.toUpperCase() + ' ' + child.lastNameChild.toUpperCase() + ' (' +  ("0" + child.birthdayChild.getDate()).slice(-2) + '.' + ("0" + (child.birthdayChild.getMonth() + 1)).slice(-2) + '.' + child.birthdayChild.getFullYear() + ')';
}

exports.getConfirmationPDF = async function(instance, reservations) {
	const config_jdbl = {
			logo: "public/assets/jdbl_new.png",
			address: "Andreas-Hofer-Strasse 36 | 39100 Bozen | Tel.: +39 0471 324753",
			internet: "info@jugenddienst.com | www.jdbl.it | St.Nr.: 94072680211",
			member: "Jugenddienst Bozen - Land",
			signature: "",
			signature_img: "public/assets/signature_jdbl.jpg"
		};
	const config_kiso = {
			logo: "public/assets/jdb.png",
			address: "Pfarrplatz 24 | 39100 Bozen | Tel.: +39 0471 972098",
			internet: "info@jd.bz.it | www.jd.bz.it | St.Nr.: 94008410212",
			member: "Jugenddienst Bozen",
			signature: "Für den Jugenddienst Bozen – Michael Hofer (Geschäftsführer)",
			signature_img: "public/assets/signature_kiso.png"
		};
	const config_jdul = {
			logo: "public/assets/jdul_logo.png",
			address: "Widumdurchgang 1 | 39044 Neumarkt | Tel.: +39 0471 812717",
			address_it: "Passaggio Canonica 1 | 39044 Egna | Tel.: +39 0471 812717",
			internet: "unterland@jugenddienst.i | www.jugenddienst.it/unterland | St.Nr.: 94008770219",
			member: "Jugenddienst Unterland",
			signature: "Barbara Postingel (Vorsitzende Jugenddienst Unterland)",
			signature_it: "Barbara Postingel (Presidente Jugenddienst Unterland)",
			signature_img: "public/assets/signature_jdul.png",
			bonus: 'Für Bonus Centro estivo: Codice identificativo „Centri con funzione educativo – ricreativa (LA)“',
			bonus_it: 'Per Bonus Centro estivo: Codice identificativo „Centri con funzione educativo – ricreativa (LA)“'
		};

	const config = instance.isJugendsommer || instance.isJDBL ? config_jdbl :
					instance.isKiso ? config_kiso :
					instance.isJDUL ? config_jdul :
					instance.isTest ? config_jdul : {};

	if(instance.isJDUL || instance.isTest)
		return getConfirmationPDF_JDUL(instance, reservations, config);

	const doc = new pdf();
	let children = reservations.map(function(v,i) { return getChildStr(v) });
	let childrenUnique = [...new Set(children)];
	for(let i = 0; i < childrenUnique.length; i++) {
		const child = childrenUnique[i];
		let registrationsPerChild = reservations.filter(reg => getChildStr(reg) === child);
		//console.log(registrationsPerChild);
		doc.image(config.logo, {
			fit: [150, 250],
			align: 'right',
			valign: 'top'
		});
		let grad = doc.linearGradient(0, 0, 30, 0);
		grad.stop(0, '#ffa500').stop(1, '#ffd27f');
		doc.rect(0, 0, 30, 950);
		doc.fill(grad);
		doc.fontSize(8).fillAndStroke("grey", "#000");
		doc.moveDown(0.2);
		doc.font('Helvetica').text(config.address);
		doc.moveDown(0.2);
		doc.text(config.internet);
		doc.fontSize(26).fillAndStroke("#ffa500", "#000");
		doc.moveDown(1).moveDown(1);
		doc.font('Helvetica-Bold').text("Einzahlungsbestätigung", { align: 'center', width: 430 });
		doc.fontSize(14).fillAndStroke("black", "#000");;
		doc.moveDown(1).moveDown(1);
		doc.font('Helvetica').text("Hiermit wird bestätigt, dass ", { align: 'left', width: 430 });
		doc.moveDown(1);
		doc.font('Helvetica-Bold').text(child, { align: 'center', width: 430 });
		doc.moveDown(1);
		doc.font('Helvetica').text("an folgenden Sommerprogrammen des " + config.member + " " + new Date().getFullYear() + " teilgenommen hat:", { align: 'left', width: 430 });
		doc.moveDown(1);
		let fee = 0;
		for(let reg of registrationsPerChild) {
			doc.font('Helvetica-Bold').text(reg.activityId.eventId.name + ' ' + reg.activityId.eventId.location + ' - ' + reg.activityId.name + ' (' + moment(reg.activityId.startDate).format('DD.MM') + '-' + moment(reg.activityId.endDate).format('DD.MM.YYYY') + ')', { align: 'left', width: 430 });
			doc.moveDown(1);
			fee += calculateReceiptFee(reg, reg.activityId);
		}
		doc.font('Helvetica').text("Spesen: Der Gesamtbetrag von ", { continued: true });
		doc.font('Helvetica-Bold').text(fee, { continued: true }).text(" Euro ", { continued: true });
		doc.font('Helvetica').text("wurde ordnungsgemäß überwiesen und ist auf das Konto des " + config.member + " eingegangen.");
		doc.moveDown(1);
		doc.image(config.signature_img, {
		 	fit: [200, 200],
			align: 'right',
			valign: 'top'
		});
		if(instance.isKiso || instance.isJDUL || instance.isTest) {
			doc.fontSize(10);
			doc.moveDown(1);
			doc.font('Helvetica').text(config.signature);
		}
		if(i < (childrenUnique.length - 1)) {
			doc.addPage();
		}
	}

	//doc.end();
	// DEBUG only
	//doc.pipe(fs.createWriteStream('./xxl.pdf'));
	return doc; //fs.createReadStream(doc);
}

const getConfirmationPDF_JDUL = async function(instance, reservations, config) {
	const doc = new pdf();
	let children = reservations.map(function(v,i) { return getChildStr(v) });
	let childrenUnique = [...new Set(children)];
	for(let i = 0; i < childrenUnique.length; i++) {
		const child = childrenUnique[i];
		let registrationsPerChild = reservations.filter(reg => getChildStr(reg) === child);
		//console.log(registrationsPerChild);
		doc.image(config.logo, {
			fit: [150, 250],
			align: 'right',
			valign: 'top'
		});
		let grad = doc.linearGradient(0, 0, 30, 0);
		grad.stop(0, '#ffa500').stop(1, '#ffd27f');
		doc.rect(0, 0, 30, 950);
		doc.fill(grad);
		doc.fontSize(8).fillAndStroke("grey", "#000");
		doc.moveDown(0.2);
		doc.font('Helvetica').text(config.address);
		doc.moveDown(0.2);
		doc.text(config.internet);
		doc.moveDown(1);
		doc.text(registrationsPerChild[0].firstNameChild + ' ' + registrationsPerChild[0].lastNameChild, { align: 'right', width: 450 });
		doc.moveDown(0.2);
		doc.text(registrationsPerChild[0].addressChild, { align: 'right', width: 450 });
		doc.moveDown(0.2);
		doc.text(registrationsPerChild[0].cityChild, { align: 'right', width: 450});
		//doc.moveDown(1);
		doc.moveDown(1);
		doc.font('Helvetica').text("Neumarkt, " + moment(Date.now()).format('DD.MM.YYYY'), { align: 'right', width: 450 }  );
		doc.fontSize(22).fillAndStroke("#ffa500", "#000");
		doc.moveDown(1);
		doc.font('Helvetica-Bold').text("Zahlungsbestätigung", { align: 'center', width: 430 });
		doc.fontSize(8).fillAndStroke("black", "#000");
		doc.moveDown(0.5);
		doc.font('Helvetica').text(config.bonus);
		doc.fontSize(12).fillAndStroke("black", "#000");;
		doc.moveDown(1);
		doc.font('Helvetica').text("Sehr geehrte Damen und Herren,");
		doc.moveDown(1);
		doc.font('Helvetica').text("Hiermit bestätigt der " + config.member + " die Teilnahme von " + child + ", für die Wochen:", { align: 'left', width: 430 });
		doc.moveDown(1);
		let fee = 0;
		let index = 0;
		//doc.font('Helvetica-Bold').text(registrationsPerChild[0].activityId.eventId.name + ' ' + registrationsPerChild[0].activityId.eventId.location, { align: 'left', width: 430 });
		//doc.moveDown(1);
		doc.fontSize(12).fillAndStroke("black", "#000");
		for(let reg of registrationsPerChild) {
			if(index > 0) doc.font('Helvetica').text(", ", {continued: true});
			doc.font('Helvetica').text(reg.activityId.name + ' (' + moment(reg.activityId.startDate).format('DD.MM') + '-' + moment(reg.activityId.endDate).format('DD.MM.YYYY') + ')', { continued: true });
			//doc.moveDown(1);
			fee += calculateReceiptFee(reg, reg.activityId);
			index += 1;
		}
		doc.text("", { continued: false });
		doc.moveDown(1);
		doc.fontSize(12).fillAndStroke("black", "#000");
		doc.font('Helvetica').text("am Sommerprogramm " + new Date().getFullYear()  + " " + registrationsPerChild[0].activityId.eventId.name + ' ' + registrationsPerChild[0].activityId.eventId.location + ".", { align: 'left', width: 430 });
		doc.moveDown(1);
		doc.font('Helvetica').text("Der Teilnahmebetrag in Höhe von  ", { continued: true });
		doc.font('Helvetica-Bold').text(fee, { continued: true }).text(" € ", { continued: true });
		doc.font('Helvetica').text(" wurde auf unser Konto überwiesen.");
		doc.moveDown(1);
		doc.font("Helvetica").text("Der Jugenddienst Unterland als ehrenamtliche Körperschaft ist von der MwSt. befreit ist (Art. 8 Abs. 2 Gesetz 266/1991).");
		doc.moveDown(1);
		doc.image(config.signature_img, {
		 	fit: [200, 200],
			align: 'right',
			valign: 'top'
		});
		doc.fontSize(10);
		doc.moveDown(1);
		doc.font('Helvetica').text(config.signature);
		doc.addPage();

		doc.image(config.logo, {
			fit: [150, 250],
			align: 'right',
			valign: 'top'
		});
		let grad2 = doc.linearGradient(0, 0, 30, 0);
		grad2.stop(0, '#ffa500').stop(1, '#ffd27f');
		doc.rect(0, 0, 30, 950);
		doc.fill(grad2);
		doc.rect(0, 0, 30, 950);
		doc.fill(grad);
		doc.fontSize(8).fillAndStroke("grey", "#000");
		doc.moveDown(0.2);
		doc.font('Helvetica').text(config.address_it);
		doc.moveDown(0.2);
		doc.text(config.internet);
		doc.moveDown(1);
		doc.text(registrationsPerChild[0].firstNameChild + ' ' + registrationsPerChild[0].lastNameChild, { align: 'right', width: 450 });
		doc.moveDown(0.2);
		doc.text(registrationsPerChild[0].addressChild, { align: 'right', width: 450 });
		doc.moveDown(0.2);
		doc.text(registrationsPerChild[0].cityChild, { align: 'right', width: 450});
		//doc.moveDown(1);
		doc.moveDown(1);
		doc.font('Helvetica').text("Egna, " + moment(Date.now()).format('DD.MM.YYYY'), { align: 'right', width: 450 } );
		doc.fontSize(26).fillAndStroke("#ffa500", "#000");
		doc.moveDown(1);
		doc.font('Helvetica-Bold').text("Conferma di pagamento", { align: 'center', width: 430 });
		doc.fontSize(8).fillAndStroke("black", "#000");;
		doc.moveDown(0.5);
		doc.font('Helvetica').text(config.bonus_it);
		doc.fontSize(14).fillAndStroke("black", "#000");;	
		doc.moveDown(1);
		doc.font('Helvetica').text("Gentili signore e signori,");
		doc.moveDown(1);
		doc.font('Helvetica').text("con la presente il " + config.member + " il conferma l’iscrizione " + child + ", per le settimane:", { align: 'left', width: 430 });
		doc.moveDown(1);
		fee = 0;
		index = 0;
		//doc.font('Helvetica-Bold').text(registrationsPerChild[0].activityId.eventId.name + ' ' + registrationsPerChild[0].activityId.eventId.location, { align: 'left', width: 430 });
		//doc.moveDown(1);
		doc.fontSize(12).fillAndStroke("black", "#000");
		for(let reg of registrationsPerChild) {
			if(index > 0) doc.font('Helvetica').text(", ", {continued: true});
			doc.font('Helvetica').text(reg.activityId.name + ' (' + moment(reg.activityId.startDate).format('DD.MM') + '-' + moment(reg.activityId.endDate).format('DD.MM.YYYY') + ')', { continued: true });
			//doc.moveDown(1);
			fee += calculateReceiptFee(reg, reg.activityId);
			index += 1;
		}
		doc.text("", { continued: false });
		doc.moveDown(1);
		doc.fontSize(12).fillAndStroke("black", "#000");
		doc.font('Helvetica').text("nel nostro programma vacanze estive " + new Date().getFullYear() + " " + registrationsPerChild[0].activityId.eventId.name + ' ' + registrationsPerChild[0].activityId.eventId.location + ".", { align: 'left', width: 430 });
		doc.moveDown(1);
		doc.font('Helvetica').text("L`importo comlessivo di ", { continued: true });
		doc.font('Helvetica-Bold').text(fee, { continued: true }).text(" € ", { continued: true });
		doc.font('Helvetica').text(" è stato versato sul nostro contocorrente.");
		doc.moveDown(1);
		doc.font('Helvetica').text("Il Jugenddienst Unterland come organizzazione di volontariato è esente dall’IVA (L. 11 agosto 1991, n. 266).");
		doc.moveDown(1);
		doc.image(config.signature_img, {
		 	fit: [200, 200],
			align: 'right',
			valign: 'top'
		});
		doc.fontSize(10);
		doc.moveDown(1);
		doc.font('Helvetica').text(config.signature_it);

		if(i < (childrenUnique.length - 1)) {
			doc.addPage();
		}
	}
	return doc; //fs.createReadStream(doc);
}

exports.getAttachmentConfirmation = function(body, instance, reservations) {
	var doc = getConfirmationPDF(instance, reservations);
	if(instance.isJDBL || instance.isJugendsommer) {
		return [{ data: body, alternative: true },
				{ path:"public/assets/jdbl-logo.jpg", type:"image/jpg", headers:{"Content-ID":"<my-image>"} },
			    { stream: doc, type:"application/pdf", name: 'Einzahlungsbestaetigung.pdf' }]
	}
	else if (instance.isJDUL) {
		return [{ data: body, alternative: true },
			{ path:"public/assets/jdul_ente.jpg", type:"image/jpg", headers:{"Content-ID":"<my-image>"} },
		    { stream: doc, type: "application/pdf", name: 'Einzahlungsbestaetigung.pdf' }]
	} else {
		return [{ data: body, alternative: true },
		        { stream: doc, type:"appliation/pdf", name: 'Einzahlungsbestaetigung.pdf' }];
	}
}

exports.getTypeBody = function(type, firstNameChild, lastNameChild, activities, reservation, instance) {
	// console.log(instance, "platform")
	if(instance.isKiso) {
		if(type === 'jumprun')
			return htmlJumpRun;
		else {
			//console.log(activities[0].eventId.name, activities[0].eventId.name.startsWith("KiSo"))
			if(activities[0].eventId.name.startsWith("KiSo")) return htmlKiso;
			return htmlKisoSP;
		}
	}
	else if (instance.isJDUL) {
		//console.log(activities[0].maxParticipants, activities[0].curParticipants)
		if(activities[0].maxParticipants <= activities[0].curParticipants) { //child on waiting list
			return htmlWaitingListJDUL + htmlWaitingListJDUL_it;
		} else { // regular reservation
			// return htmlStartJDUL_de + firstNameChild + htmlMiddleJDUL_de + activities[0].eventId.location + htmlEndJDUL_de + "<br />" +
			// 		htmlStartJDUL_it + firstNameChild + htmlMiddleJDUL_it + activities[0].eventId.location_it + htmlEndJDUL_it + "<br /><br />" +
			// 		   getActivityTable(activities) + "<br /><br />" + getReservationTable(reservation) + "<br /><br />" + getJDULFooter() + "<br />" + htmlFinalJDUL;
			return htmlStartJDUL_de + firstNameChild + htmlMiddleJDUL_de + htmlEndJDUL_de + "<br />" +
				htmlStartJDUL_it + firstNameChild + htmlMiddleJDUL_it + htmlEndJDUL_it + "<br /><br />" +
				getActivityTable(activities) + "<br /><br />" + getReservationTable(reservation) + "<br /><br />" + getJDULFooter() + "<br />" + htmlFinalJDUL;
		}
	}
	else if(instance.isJSGries) {
		return htmlJSGries;
	}
	else {
		switch (type) {
			case 'summer':
			case 'music':
			case 'club':
			case 'bike':
				if(activities[0].maxParticipants <= activities[0].curParticipants) { //child on waiting list
					return htmlStartWait + firstNameChild + " " + lastNameChild + htmlEndWait + getActivityTable(activities) + "<br />" + getReservationTable(reservation) + "<br />" + getJDBLFooter() + htmlCloseWait;
				} else { // regular reservation
					return htmlStart + firstNameChild + " " + lastNameChild + htmlEnd + getActivityTable(activities) + "<br />" + getReservationTable(reservation) + "<br />" + getJDBLFooter() + htmlClose;
				}
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
	return htmlReceiptStart + "<br /><br />" + getReceiptTable(reservations, rnumber) + "<br />" + getJDBLReceiptFooter() + "<br />" + htmlReceiptEnd;
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

exports.getReminderTxt = function() {
	return txtReminder;
}

exports.getReminderBody = function(reservations, rnumber) {
	return htmlReminderStart + "<br /><br />" + getReceiptTable(reservations, rnumber) + "<br />" + getJDBLFooter() + "<br />" + htmlReminderEnd;
}

exports.getConfirmationTxt = function() { return textConfirmation; }

exports.getConfirmationBody = function() { return htmlConfirmation; }

function calculateFee(activity) {
	if(activity.eventId.deadline) {
		if((moment(activity.eventId.deadline).hour(23).minute(59).second(59)).isBefore(moment())) return activity.eventId.feePerWeek + activity.eventId.penalty;
		return activity.eventId.feePerWeek;
	}
	return activity.eventId.feePerWeek;
}

function calculateReceiptFee(reservation, activity) {
	let fee = activity.eventId.feePerWeek;
	if(reservation.acceptsOptionalFee) {
		fee = fee + activity.eventId.optionalFeePerWeek;
	}
	if(reservation.isSiblingReservation) {
		fee = fee - activity.eventId.siblingDiscount;
	}
	if(reservation.activityId.eventId.deadline) {
		if((moment(activity.eventId.deadline).hour(23).minute(59).second(59)).isBefore(moment(reservation.registrationDate))) fee = fee + activity.eventId.penalty;	
	}
	return fee;
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
	var tblStart = '<p>Ihre Überweisungsnummer: <div style:"color:#ffa500"><strong>' + rnumber + '</strong></div></p>';
	tblStart += '<table style="border: 1px solid gray; border-collapse: collapse"><tr><th style="border: 1px solid gray; padding: 2px;">Programm | programma</th><th style="border: 1px solid gray; padding: 2px;">Woche | settimana</th><th style="border: 1px solid gray; padding: 2px;">Name | nome</th><th style="border: 1px solid gray; padding: 2px;">Preis | prezzo in €</th></tr>';
	var tblEnd = '</table>';
	for(var i=0; i<res.length; i++) {
		var fee = calculateReceiptFee(res[i], res[i].activityId);
		sum += fee;
		//console.log("sum", sum);
		tblStart += '<tr><td style="border: 1px solid gray; padding: 2px;">' + res[i].activityId.eventId.location + ' - ' + res[i].activityId.eventId.name + '<br />' + res[i].activityId.eventId.location_it + ' - ' + res[i].activityId.eventId.name_it + '</td><td style="border: 1px solid gray; padding: 2px">' + res[i].activityId.name + '<br />' + res[i].activityId.name_it + '</td><td style="border: 1px solid gray; padding: 2px;">' + res[i].firstNameChild + ' ' + res[i].lastNameChild +'</td><td style="border: 1px solid gray; padding: 2px;">' + fee + '</td></tr>';
		//console.log("html", tblStart);
	}
	tblStart += '<tr style="background-color:#ffa500"><td style="border:1px solid gray; padding: 2px;"><strong>Summe | somma in €</strong></td><td style="border: 1px solid gray;"></td><td style="border: 1px solid gray;"></td><td style="border: 1px solid gray; padding: 2px;">' + sum + '</td></tr>'
	return tblStart + tblEnd;
}

function getReservationTable(res) {
	var tbleStart = '<table style="border: 1px solid gray; border-collapse: collapse;">';
	var tbleEnd = '</table>';
	tbleStart += '<tr><td style="padding: 2px">Vorname | nome</td><td style="padding: 2px">' + res.firstNameChild + '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Nachname | cognome</td><td style="padding: 2px">' + res.lastNameChild + '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Geburtsdatum | data di nascita</td><td style="padding: 2px">' + moment(res.birthdayChild).format("DD MM YYYY") + '</td></tr>'; //.toISOString().substring(0, 10) + '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Besuchte Klasse | classe frequentata</td><td style="padding: 2px">' + res.schoolChild + '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Vorname Eltern | nome genitori</td><td style="padding: 2px">' + res.firstNameParent + '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Nachname Eltern | cognome genitori</td><td style="padding: 2px">' + res.lastNameParent+ '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Email</td><td style="padding: 2px">' + res.emailParent + '</td></tr>';
	tbleStart += '<tr><td style="padding: 2px">Telefon</td><td style="padding: 2px">' + res.phoneNumberParent + '</td></tr>'; 

	return tbleStart + tbleEnd;
}

function getJDBLFooter() {
	var footer = '<table>';
	footer += '<tr><td><strong>Jasmin Saltuari</strong></td></tr>';
	footer += '<tr><td><strong>Mitarbeiterin für Sommerprojekte und soziale Medien</strong></td></tr>';
	footer += '<tr><td><h4>Jugenddienst Bozen-Land</h4></td></tr>';
	footer += '<tr><td>Andreas-Hoferstr. 36</td></tr>';
	footer += '<tr><td>39100 Bozen, Südtirol/Italy</td></tr>';
	footer += '<tr></tr>';
	footer += '<tr><td>Telefon: 3473340181</td></tr>';
	footer += '<tr><td>E-Mail: <a mailto="jasmin@jugenddienst.com">jasmin@jugenddienst.com</a></td></tr>';
	footer += '<tr><td>E-Mail: <a mailto="info@jugenddienst.com">info@jugenddienst.com</a></td></tr>';
	footer += '<tr><td><a href="https://www.jdbl.it">Homepage: www.jdbl.it</a></td></tr>'
	footer += '<tr><td>St.-Nr.: 94072680211</td></tr>';
	footer += '<tr></tr>';
	footer += '<tr><td><img src="cid:my-image" width="150" /></td></tr>';
	footer += '</table>';
	return footer;
}

function getJDBLReceiptFooter() {
	var footer = '<table>';
	footer += '<tr><td><h4>Günther Reichhalter</h4></td></tr>';
	footer += '<tr><td><h4>Geschäftsführung</h4></td></tr>';
	footer += '<tr></tr>';	
	footer += '<tr><td><h4>Jugenddienst Bozen-Land</h4></td></tr>';
	footer += '<tr><td>Andreas-Hoferstr. 36</td></tr>';
	footer += '<tr><td>39100 Bozen, Südtirol/Italy</td></tr>';
	footer += '<tr></tr>';
	footer += '<tr><td>Telefon: 3408136941</td></tr>';
	footer += '<tr><td>E-Mail: <a mailto="guenther@jugenddienst.com">guenther@jugenddienst.com</a></tr></td>';
	footer += '<tr><td>E-Mail: <a mailto="info@jugenddienst.com">info@jugenddienst.com</a></tr></td>';
	footer += '<tr><td><a href="https://www.jdbl.it">Homepage: www.jdbl.it</a></td></tr>'
	footer += '<tr><td>St.-Nr.: 94072680211</td></tr>';
	footer += '<tr></tr>';
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
	footer += '<tr><td><a href="https://www.jugenddienstunterland.it">www.jugenddienstunterland.it</a></td></tr>';
	footer += '<tr></tr>';
	footer += '<tr><td>IBAN: IT27T0822058371000304204042</td></tr>';
	footer += '<tr></tr>';
	footer += '<tr><td><img src="cid:my-image" width="150" /></td></tr>';
	footer += '</table>';
	return footer;
}