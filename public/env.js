(function (window) {
    window.__env = window.__env || {};
    window.__env.cities_jdbl = ['Deutschnofen', 'Jenesien', 'Kastelruth', 'Karneid', 'Mölten', 'Ritten', 'Sarntal', 'Tiers', 'Völs', 'Vöran', 'Welschnofen', 'Andere'];
    window.__env.cities_kiso = ['Bozen', 'Andere'];
    window.__env.cities_jdul = ['Altrei', 'Aldein', 'Auer', 'Kurtatsch', 'Laag', 'Margreid', 'Montan', 'Neumarkt', 'Tramin', 'Truden', 'Andere'];
    window.__env.tSizes = [
        {"name": '3-4 Jahre/89-104cm',             "name_it": '3-4 anni/89-104cm'},
        {"name": '5-6 Jahre/110-116cm',            "name_it": '5-6 anni/110-116cm'},
        {"name": '7-8 Jahre/122-128cm',            "name_it": '7-8 anni/122-128cm'},
        {"name": '9-10 Jahre/134-140cm',           "name_it": '9-10 anni/134-140cm'},
        {"name": '11-12 Jahre/146-152cm',          "name_it": '11-12 anni/146-152cm'},
        {"name": 'Erwachsenengröße S',             "name_it": 'Misura adulti S'},
        {"name": 'Erwachsenengröße M',             "name_it": 'Misura adulti M'},
    ];
    window.__env.translations = window.__env.translations || {};
    window.__env.translations.de = {
        "NAV": {
            "INFO": "Info",
            "PROGRAM": "Anmeldung",
            "MYRES": "Meine Reservierungen",
            "MYCOMMITS": "Meine Rechnungen",
            "REPORT": "Report",
            "RESERVATIONS": "Anmeldungen",
            "PAYMENT": "Auszahlung",
            "LENDINGS": "Material",
            "USERSEARCH": "User"
        },
        "LOGIN": {
            "USER": "User",
            "PWD": "Passwort",
            "LOGIN": "Anmelden",
            "NEW": "Neuer User",
            "PWDNEW": "Passwort vergessen",
            "MSG_LOGIN_SUCCESS": "Sie haben sich erfolgreich angemeldet",
            "MSG_LOGOUT_SUCCESS": "Sie haben sich erfolgreich abgemeldet",
            "MSG_LOGIN_NOTFOUND": "Ihre User Passwort Kombination konnte nicht gefunden werden. Legen Sie einen neuen User an."
        },
        "USER_NEW": {
            "TITLE": "Neuen User erstellen / Angaben zu den Eltern",
            "LABEL_FIRSTNAME": "Vorname",
            "LABEL_LASTNAME": "Nachname",
            "LABEL_TEL": "Tel",
            "LABEL_EMAIL": "Email",
            "LABEL_USERNAME": "User-Name",
            "LABEL_PWD": "Passwort",
            "NOTE": "Bitte merken Sie sich Ihren User-Namen und Passwort für die spätere Nutzung",
            "BUTTON_ADD": "Hinzufügen"
        },
        "LOST_PWD": {
            "TITLE1": "Neuen Sicherheits-Code anfordern",
            "NOTE1": "Für den angegebenen User-Namen wird Ihnen ein Sicherheits-Code auf die dem User hinterlegte Email-Adresse zugesendet, mit dem Sie ein neues Passwort vergeben können",
            "LABEL_USERNAME1": "User-Name",
            "BUTTON_SUBMIT1": "Absenden",
            "TITLE2": "Neues Password vergeben",
            "NOTE2": "Bitte verwenden Sie den Sicherheits-Code, der Ihnen per Email zugesandt wurde.",
            "LABEL_USERNAME2": "User-Name",
            "LABEL_SECURITY_CODE2": "Sicherheits-Code",
            "LABEL_PASSWORD2": "Passwort",
            "BUTTON_SUBMIT2": "Ändern"
        },
        "SELECTION": {
            "TITLE": "Wir sind in folgenden Gemeinden vertreten",
            "PROGRAM": "Programme",
            "INFO": "Bitte lesen Sie sich vor der Anmeldung aufmerksam unsere Allgemeinen Geschäftsbedingungen durch!",
        },
        "EVENTS": {
            "TITLE": "Programme"
        },
        "ACTIVITIES": {
            "TITLE": "Unsere Wochen",
            "STATUS_RESERVATION": "Anmeldungen für {{count}} Plätze",
            "STATUS_LIMIT": "Nur mehr Anmeldung auf Warteliste möglich!",
            "STATUS_COMPLETE": "Ausgebucht. Keine Anmeldung mehr möglich",
            "WARNINGTITLE": "Achtung",
            "WARNING": "Um sich Anmelden zu können, müssen sie als User eingeloggt und weiter freie Plätze vorhanden sein!"
        },
        "INFO": {
            "BACK": "Zurück"
        },
        "RESERVATION": {
            "TITLE": "Anmeldung",
            "HEADER_SPIRIT_PARENT": "Angaben Begleitperson:",
            "HEADER_SUMMER_PARENT": "Angaben Eltern:",
            "HEADER_SPIRIT_CHILD": "Angaben zum Firmling:",
            "HEADER_SUMMER_CHILD": "Angaben zum Kind:",
            "HEADER_MUSIC": "Auszufüllen nur bei Anmeldung für die Jungbläserwochen",
            "HEADER_CONTACT": "Notfallkontakte",
            "LABEL_LOAD_PREVIOUS": "Daten von letzter Anmeldung verwenden",
            "LABEL_FIRSTNAME_PARENT": "Vorname",
            "LABEL_LASTNAME_PARENT": "Familienname",
            "LABEL_TEL_PARENT": "Tel",
            "LABEL_MAIL_PARENT": "Email",
            "LABEL_MAIL_PARENT_CHECK": "Email wiederholen",
            "LABEL_FIRSTNAME_CHILD": "Vorname",
            "LABEL_LASTNAME_CHILD": "Familienname",
            "LABEL_BIRTHDAY_CHILD": "Geburtstag",
            "LABEL_SCHOOL_CHILD": "Besuchte Klasse / Kindergartenjahr 2017/18",
            "LABEL_HEALTH_CHILD": "Gesundheitliche Probleme/Hinweise",
            "LABEL_ADDRESS_CHILD": "Adresse",
            "LABEL_CITY_CHILD": "Gemeinde",
            "LABEL_T_SHIRT_SIZE": "T-Shirt Size",
            "LABEL_PRECARE_CHILD": "  NUR BEI KINDERSOMMERPROGRAMMEN: Ich wünsche eine Beaufsichtigung meines Kindes von 08.00 - 09.00 Uhr (+15 Euro die Woche)",
            "LABEL_BANDNAME_CHILD": "Musikkapelle",
            "LABEL_INSTRUMENT_CHILD": "Instrument",
            "LABEL_YEARSINSTRUMENT_CHILD": "Ausbildungsjahr",
            "LABEL_DISABILITY_CHILD": "Kind mit Beeinträchtigung",
            "LABEL_DISABILITY_CHILD_DESCRIPTION": "Diagnose bei Beenträchtigung",
            "LABEL_NAME_CONTACT1": "Name1",
            "LABEL_TEL_CONTACT1": "Telefon 1",
            "LABEL_NAME_CONTACT2": "Name2",
            "LABEL_TEL_CONTACT2": "Telefon 2",
            "LABEL_ABK_CHILD": "  Ich benötige eine Teilnahmebestätigung für EbK",
            "LABEL_TERMS1": "  Ich akzeptiere die ",
            "LABEL_TERMS2": "allgemeinen Geschäftsbedingungen",
            "LABEL_REGISTER": "Anmelden",
            "LABEL_REGISTRATION_PAY_INFO": "Nach erfolgreicher Anmeldung für ein Programm ist eine Einzahlung verpflichtend",
            "BUTTON_SUBMIT": "Anmelden",
            "MSG_SUCCESS": "Anmeldung erfolgreich gespeichert",
            "MSG_NO_DUPLICATES": "Doppelte Anmeldungen pro Veranstaltung sind nicht möglich"
        },
        "MYRESERVATION": {
            "TITLE": "Erfolgreiche Reservierungen",
            "NOTE": "Zahlungsaufforderung wird innerhalb von fünf Tagen zugesandt. Danke für Ihre Reservierung.",
            "LABEL_EVENT": "Programm",
            "LABEL_ACTIVITY": "Woche",
            "LABEL_ACCEPT": "Angenommen",
            "LABEL_PAYED": "Bezahlt",
            "LABEL_PRECARE_CHILD": "Frühbetreuung",
            "LABEL_FIRSTNAME_CHILD": "Vorname",
            "LABEL_LASTNAME_CHILD": "Nachname",
            "LABEL_BIRTHDAY_CHILD": "Geburtstag",
            "LABEL_FIRSTNAME_PARENT": "Vorname Eltern",
            "LABEL_LASTNAME_PARENT": "Nachname Eltern",
            "LABEL_MAIL_PARENT": "Email Eltern",
            "LABEL_TEL_PARENT": "Tel. Eltern"
        }
    };
    window.__env.translations.it = {
        "NAV": {
            "INFO": "Info",
            "PROGRAM": "Iscrizione",
            "MYRES": "Le mie prenotazioni",
            "MYCOMMITS": "Le mie fatture",
            "REPORT": "Report",
            "RESERVATIONS": "Prenotazioni",
            "PAYMENT": "Computo",
            "LENDINGS": "Materiale",
            "USERSEARCH": "Utente"
        },
        "LOGIN": {
            "USER": "Utente",
            "PWD": "Password",
            "LOGIN": "Accesso",
            "NEW": "Nuovo utente",
            "PWDNEW": "password dimenticata",
            "MSG_LOGIN_SUCCESS": "Login avvenuto con successo",
            "MSG_LOGOUT_SUCCESS": "Logout avvenuto con successo",
            "MSG_LOGIN_NOTFOUND": "Password o utente non trovato. Crearsi un nuovo utente."
        },
        "USER_NEW": {
            "TITLE": "Crea nuovo account",
            "LABEL_FIRSTNAME": "nome",
            "LABEL_LASTNAME": "cognome",
            "LABEL_TEL": "numero telefono",
            "LABEL_EMAIL": "e-mail",
            "LABEL_USERNAME": "user-Name",
            "LABEL_PWD": "password",
            "NOTE": "Ricordarsi il nome utente e la password per l’accesso!",
            "BUTTON_ADD": "creare"
        },
        "LOST_PWD": {
            "TITLE1": "Richiesta nuovo codice di sicurezza",
            "NOTE1": "Le sará inviato un codice di sicurezza all’indirizzo mail indicato, con il quale potrá scegliersi una nuova password",
            "LABEL_USERNAME1": "Nome utente",
            "BUTTON_SUBMIT1": "Invio",
            "TITLE2": "Assegnare nuova password",
            "NOTE2": "Si prega di inserire il codice di sicurezza inviato via mail",
            "LABEL_USERNAME2": "Nome utente",
            "LABEL_SECURITY_CODE2": "Codice di sicurezza",
            "LABEL_PASSWORD2": "Password",
            "BUTTON_SUBMIT2": "Cambio password"
        },
        "SELECTION": {
            "TITLE": "Siamo presenti nei seguenti communi",
            "PROGRAM": "programmi",
            "INFO": "Preghiamo di leggere attentamente le nostre condizioni generali prima di effettuare l’iscrizione"
        },
        "EVENTS": {
            "TITLE": "programmi"
        },
        "ACTIVITIES": {
            "TITLE": "Dettagli",
            "STATUS_RESERVATION": "Iscrizioni per {{count}} posti",
            "STATUS_LIMIT": "solo lista d'attesa",
            "STATUS_COMPLETE": "posti esauriti",
            "WARNINGTITLE": "attenzione",
            "WARNING": "Per iscriversi è necessario effettuare il login. Poi dipende dalla disponibilità di posti liberi."
        },
        "INFO": {
            "BACK": "indietro"
        },
        "RESERVATION": {
            "TITLE": "Iscrizione",
            "HEADER_SPIRIT_PARENT": "Angaben Begleitperson:",
            "HEADER_SUMMER_PARENT": "Dati genitori:",
            "HEADER_SPIRIT_CHILD": "Angaben zum Firmling:",
            "HEADER_SUMMER_CHILD": "Dati bambino/a",
            "HEADER_MUSIC": "Auszufüllen nur bei Anmeldung für die Jungbläserwochen",
            "HEADER_CONTACT": "Contatti di emergenza",
            "LABEL_LOAD_PREVIOUS": "usare i dati dell'ultima iscrizione",
            "LABEL_FIRSTNAME_PARENT": "nome",
            "LABEL_LASTNAME_PARENT": "cognome",
            "LABEL_TEL_PARENT": "numero di telefono",
            "LABEL_MAIL_PARENT": "e-mail",
            "LABEL_MAIL_PARENT_CHECK": "e-mail wiederholen",
            "LABEL_FIRSTNAME_CHILD": "nome",
            "LABEL_LASTNAME_CHILD": "cognome",
            "LABEL_BIRTHDAY_CHILD": "data di nascita",
            "LABEL_SCHOOL_CHILD": "classe frequentata / anno della scuola materna 2017/18",
            "LABEL_HEALTH_CHILD": "informazioni sulla salute",
            "LABEL_ADDRESS_CHILD": "indirizzo",
            "LABEL_CITY_CHILD": "comune",
            "LABEL_T_SHIRT_SIZE": "t-shirt size",
            "LABEL_PRECARE_CHILD": "  NUR BEI KINDERSOMMERPROGRAMMEN: Ich wünsche eine Beaufsichtigung meines Kindes von 08.00 - 09.00 Uhr (+15 Euro die Woche)",
            "LABEL_BANDNAME_CHILD": "Musikkapelle",
            "LABEL_INSTRUMENT_CHILD": "Instrument",
            "LABEL_YEARSINSTRUMENT_CHILD": "Ausbildungsjahr",
            "LABEL_DISABILITY_CHILD": "Bambini con bisogni speciali",
            "LABEL_DISABILITY_CHILD_DESCRIPTION": "diagnosi",
            "LABEL_NAME_CONTACT1": "nome1",
            "LABEL_TEL_CONTACT1": "telefono 1",
            "LABEL_NAME_CONTACT2": "nome2",
            "LABEL_TEL_CONTACT2": "telefono 2",
            "LABEL_ABK_CHILD": "  Ich benötige eine Teilnahmebestätigung für EbK",
            "LABEL_TERMS1": "  accetto ",
            "LABEL_TERMS2": "termini e condizioni",
            "LABEL_REGISTER": "iscrizione",
            "LABEL_REGISTRATION_PAY_INFO": "Mit erfolgreicher Anmeldung für ein Programm ist eine Einzahlung verpflichtend",
            "BUTTON_SUBMIT": "Invio iscrizione",
            "MSG_SUCCESS": "Iscrizione salvata con successo",
            "MSG_NO_DUPLICATES": "Non sono possibili iscrizione doppie per la stessa settimana"
        },
        "MYRESERVATION": {
            "TITLE": "Prenotazioni confermate",
            "NOTE": "L‘avviso di pagamento verrà inviato entro cinque giorni. Grazie per la sua prenotazione!",
            "LABEL_EVENT": "programma",
            "LABEL_ACTIVITY": "settimana",
            "LABEL_ACCEPT": "accettato",
            "LABEL_PAYED": "pagato",
            "LABEL_PRECARE_CHILD": "Frühbetreuung",
            "LABEL_FIRSTNAME_CHILD": "nome",
            "LABEL_LASTNAME_CHILD": "cognome",
            "LABEL_BIRTHDAY_CHILD": "data di nascita",
            "LABEL_FIRSTNAME_PARENT": "nome genitore",
            "LABEL_LASTNAME_PARENT": "cognome genitore",
            "LABEL_MAIL_PARENT": "e-mail genitore",
            "LABEL_TEL_PARENT": "telefono genitore"
        }
    };
}(this));
