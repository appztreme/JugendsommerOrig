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
    window.__env.schoolLevels = [
        {"name": "1. Kindergarten Jahr",            "name_it": '1 anno scuola materna'},
        {"name": "2. Kindergarten Jahr",            "name_it": "2 anno scuola materna"},
        {"name": "3. Kindergarten Jahr",            "name_it": "3 anno scuola materna"},
        {"name": "4. Kindergarten Jahr",            "name_it": "4 anno scuola materna"},
        {"name": '1. Klasse Grundschule',           "name_it": '1° elementare' },
        {"name": '2. Klasse Grundschule',           "name_it": '2° elementare' },
        {"name": '3. Klasse Grundschule',           "name_it": '3° elementare' },
        {"name": '4. Klasse Grundschule',           "name_it": '4° elementare' },
        {"name": '5. Klasse Grundschule',           "name_it": '5° elementare '},
        {"name": '1. Klasse Mittelschule',          "name_it": '1° media '},
        {"name": '2. Klasse Mittelschule',          "name_it": '2° media'},
        {"name": '3. Klasse Mittelschule',          "name_it": '3° media'},
        {"name": '1. Klasse Oberschule',            "name_it": '1° superiore'}
    ],
    window.__env.translations = window.__env.translations || {};
    window.__env.translations.de = {
        "NAV": {
            "INFO": "Info",
            "PROGRAM": "Anmeldung",
            "MYRES": "Meine Anmeldungen",
            "MYCOMMITS": "Meine Rechnungen",
            "REPORT": "Report",
            "PRESENCE": "Anwesenheit",
            "OVERVIEW": "Übersicht",
            "RESERVATIONS": "Anmeldungen",
            "FILTERCONFIRM": "Bestätigung",
            "PAYMENT": "Auszahlung",
            "LENDINGS": "Material",
            "USERSEARCH": "User",
            "AGB": "AGB"
        },
        "BTN": {
            "RESERVE": "Anmelden",
            "INFO": "Info",
            "EDIT": "Edit",
            "WEEKS": "Wochen",
            "EXPENSE": "Ausgabe",
            "TEXPENSE": "KM-Geld",
            "RESERVATIONS": "Anmeldungen",
            "CONTACTS": "Kontakte",
            "PAYMENT": "Zahlung",
            "REMINDER": "Erinnerung",
            "CONFIRMATION": "Bestätigung",
            "ADMIN": "Admin",
            "YES": "Ja",
            "NO": "Nein"
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
            "TITLE_KISO": "KISO 2020",
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
            "HEADER_STEP1": "1. Kontaktdaten",
            "HEADER_STEP2": "2. Woche auswählen",
            "HEADER_STEP3": "3. Bestätigen",
            "LABEL_LOAD_PREVIOUS": "Daten von letzter Anmeldung verwenden",
            "LABEL_LOAD_SIBLING": "Geschwisterkind anmelden (Rabatt)",
            "LABEL_FIRSTNAME_PARENT": "Vorname",
            "LABEL_LASTNAME_PARENT": "Familienname",
            "LABEL_TEL_PARENT": "Tel",
            "LABEL_MAIL_PARENT": "Email",
            "LABEL_MAIL_PARENT_CHECK": "Email wiederholen",
            "LABEL_FIRSTNAME_CHILD": "Vorname",
            "LABEL_LASTNAME_CHILD": "Familienname",
            "LABEL_BIRTHDAY_CHILD": "Geburtsdatum",
            "LABEL_SCHOOL_CHILD": "Besuchte Klasse 2019/20",
            "LABEL_HEALTH_CHILD": "Gesundheit / sonstige Infos",
            "LABEL_ADDRESS_CHILD": "Adresse",
            "LABEL_CITY_CHILD": "Wohnort",
            "LABEL_T_SHIRT_SIZE": "T-Shirt Size",
            "LABEL_CANSWIM_CHILD": "Mein Kind kann schwimmen",
            "INFO_CANSWIM_1": "Es wird darauf hingewiesen, dass jene Kinder, bei denen „mein Kind kann nicht schwimmen“ angegeben wird, nicht ohne Schwimmflügel ins Wasser dürfen.",
            "INFO_CANSWIM_2": "Die Kinder gehen immer als Gruppe ins Schwimmbecken. Sie werden immer von mehreren Betreuer/Innen beaufsichtigt.",
            "LABEL_CANGOHOME_CHILD": "Mein Kind darf alleine nach Hause gehen",
            "LABEL_PRECARE_CHILD": "  NUR BEI KINDERSOMMERPROGRAMMEN: Ich wünsche eine Beaufsichtigung meines Kindes von 08.00 - 09.00 Uhr (+15 Euro die Woche)",
            "LABEL_BANDNAME_CHILD": "Musikkapelle",
            "LABEL_INSTRUMENT_CHILD": "Instrument",
            "LABEL_YEARSINSTRUMENT_CHILD": "Ausbildungsjahr",
            "LABEL_HEALTHISSUES_CHILD": "Gesundheitliche Probleme",
            "LABEL_HEALTH_INCOMPATIBILITY": "Unverträglichkeiten",
            "LABEL_HEALTH_ALLERGY": "Allergien",
            "LABEL_HEALTH_ILLNESS": "Medikamente",
            "LABEL_DISABILITY_CHILD": "Kind mit Beeinträchtigung",
            "LABEL_DISABILITY_CHILD_DESCRIPTION": "Beeinträchtigung",
            "LABEL_DIAGNOSTIC_CHILD_DESCRIPTION": "Diagnose",
            "LABEL_HEIGHT_CHILD": "Körpergröße in cm",
            "LABEL_HASOWNEBIKE": "Ich benutze mein eigenes E-Bike",
            "LABEL_NAME_CONTACT1": "Name1",
            "LABEL_TEL_CONTACT1": "Telefon 1",
            "LABEL_NAME_CONTACT2": "Name2",
            "LABEL_TEL_CONTACT2": "Telefon 2",
            "LABEL_ABK_CHILD": "  Ich benötige eine Teilnahmebestätigung für EbK",
            "LABEL_TERMS1": "  Ich akzeptiere mittels Anklicken des entsprechenden Buttons die ",
            "LABEL_TERMS2": "Allgemeinen Geschäftsbedingungen",
            "LABEL_TERMS3": " und nehme die Verarbeitung der notwendigen personenbezogenen Daten gemäß ",
            "LABEL_TERMS4": " Datenschutzerklärung ",
            "LABEL_TERMS5": " zur Kennntis.",
            "INFO_EBK_1": "EbK ist die Bilaterale Körperschaft für den Sektor Handel und Dienstleistungen in Südtirol. Die Dienstleistungen der EbK sind an Mitglieder der EbK gerichtet. EBK fördert u.a. die Vereinbarkeit von Familie und Beruf und soziale Initiativen. Die Sommerferienprogramme des Jugenddienstes stellen eine solche Initiative dar und den Eltern kann somit ein Teil des Teilnehmerbeitrages zurückerstattet werden. Bitte informieren Sie sich bei ihrem Arbeitgeber, ob der Betrieb Mitglied des EbK ist. Nähere Informationen unter ebk.bz.it",
            "INFO_EBK_DOWNLOAD": "Eine Teilnahmebestätigung kann von jedem unter 'Meine Anmeldungen' auf dieser Homepage (ab Ende Juli) heruntergeladen werden",
            "LABEL_INSUR1": "  gelesen und akzeptiert ",
            "LABEL_INSUR2": "Versicherungsansprüche",
            "LABEL_PRIVACY1": " Hiermit erkläre ich, die ",
            "LABEL_PRIVACY2": " Datenschutzerklärung für diese Webseite ",
            "LABEL_PRIVACY3": " gelesen zu haben.",
            "LABEL_MEDIA1": " Hiermit erteile ich die ",
            "LABEL_MEDIA2": " Erlaubnis ",
            "LABEL_MEDIA3": " zur rechtmäßigen Verwendung von Bild- und Filmmaterial",
            "LABEL_MEDIA1_JDBL": " Ich willige mittels Anklicken des entsprechenden Buttons ein, dass mein Name und mein Nachname sowie mein Lichtbild für die in Punkt 10 der  ",
            "LABEL_MEDIA2_JDBL": " Datenschutzerklärung ",
            "LABEL_MEDIA3_JDBL": " genannten Zwecke in den dort genannten Medien verwendet werden können.",
            "LABEL_HEALTH1_JDBL": " Ich willige mittels Unterschrift bzw. Anklicken des entsprechenden Buttons ein, dass die Gesundheitsdaten in Punkt 9 (siehe ",
            "LABEL_HEALTH2_JDBL": " Datenschutzerklärung ",
            "LABEL_HEALTH3_JDBL": " ) für die dort genannten Zwecke verwendet werden können.",
            "LABEL_REGISTER": "Anmelden",
            "LABEL_REGISTRATION_PAY_INFO": "Mit erfolgreicher Anmeldung erhalten sie ein Bestätigungsmail und eine Einzahlung ist verpflichtend",
            "LABEL_REGISTRATION_RECEIPT_INFO": "Anmeldebestätigung folgt per Email",
            "LABEL_NEWSLETTER": " Ich möchte eine Newsletter für künftige Angebote erhalten",
            "LABEL_OPTIONALPAYMENT": " Ich möchte freiwillig ein zusätzlichen Spendenbeitrag (10EUR) bezahlen",
            "BUTTON_SUBMIT": "Anmelden",
            "BUTTON_NEXT": "Weiter",
            "BUTTON_PREVIOUS": "Zurück",
            "MSG_SUCCESS": "Anmeldung erfolgreich gespeichert",
            "MSG_NO_DUPLICATES": "Doppelte Anmeldungen pro Veranstaltung sind nicht möglich",
            "MSG_ERROR": "Bei Ihrer Anmeldung ist ein Problem aufgetreten. Bitte Loggen Sie sich im System neu ein.",
            "MSG_FORM_NOT_VALID": "Das Formular enthält nicht valide Einträge"
        },
        "MYRESERVATION": {
            "TITLE": "Reservierungen",
            "NOTE": "Zahlungsaufforderung wird im März zugesandt. Danke für Ihre Reservierung.",
            "NOTE_KISO": "In den nächsten Tagen erfahren Sie via E-Mail von uns, ob Sie unter den ersten 45 Anmeldungen gelandet sind oder einen Platz auf der Warteliste haben",
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
            "LABEL_TEL_PARENT": "Tel. Eltern",
            "LABEL_DOWNLOAD_CONFIRMATION": "EbK Bestätigung"
        }
    };
    window.__env.translations.it = {
        "NAV": {
            "INFO": "Info",
            "PROGRAM": "Iscrizione",
            "MYRES": "Le mie prenotazioni",
            "MYCOMMITS": "Le mie fatture",
            "REPORT": "Report",
            "PRESENCE": "Presenza",
            "OVERVIEW": "Panoramica",
            "RESERVATIONS": "Prenotazioni",
            "FILTERCONFIRM": "Bestätigung",
            "PAYMENT": "Computo",
            "LENDINGS": "Materiale",
            "USERSEARCH": "Utente",
            "AGB": "Condizioni Generali"
        },
        "BTN": {
            "RESERVE": "Iscrizione",
            "INFO": "Info",
            "EDIT": "Edit",
            "WEEKS": "Wochen",
            "EXPENSE": "Ausgabe",
            "TEXPENSE": "KM-Geld",
            "RESERVATIONS": "Anmeldungen",
            "CONTACTS": "Kontakte",
            "PAYMENT": "Zahlung",
            "REMINDER": "Erinnerung",
            "CONFIRMATION": "Bestätigung",
            "ADMIN": "Admin",
            "YES": "Si",
            "NO": "No"
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
            "TITLE": "Siamo presenti nei seguenti comuni",
            "TITLE_KISO": "Kiso 2020",
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
            "HEADER_STEP1": "1. contatti",
            "HEADER_STEP2": "2. scegli settimana",
            "HEADER_STEP3": "3. conferma",
            "LABEL_LOAD_PREVIOUS": "usare i dati dell'ultima iscrizione",
            "LABEL_LOAD_SIBLING": "iscrivere fratello/sorella (sconto)",
            "LABEL_FIRSTNAME_PARENT": "nome",
            "LABEL_LASTNAME_PARENT": "cognome",
            "LABEL_TEL_PARENT": "numero di telefono",
            "LABEL_MAIL_PARENT": "e-mail",
            "LABEL_MAIL_PARENT_CHECK": "ripeti e-mail",
            "LABEL_FIRSTNAME_CHILD": "nome",
            "LABEL_LASTNAME_CHILD": "cognome",
            "LABEL_BIRTHDAY_CHILD": "data di nascita",
            "LABEL_SCHOOL_CHILD": "classe frequentata 2019/20",
            "LABEL_HEALTH_CHILD": "salute / ulteriori informazioni",
            "LABEL_ADDRESS_CHILD": "indirizzo",
            "LABEL_CITY_CHILD": "comune",
            "LABEL_T_SHIRT_SIZE": "t-shirt size",
            "LABEL_CANSWIM_CHILD": "mio figlio/a sa nuotare",
            "INFO_CANSWIM_1": "Avvisiamo, che i bambini per i quali viene scelto „il mio bambino non sa nuotare“ devono indossare i braccioli in tutte le vasche.",
            "INFO_CANSWIM_2": "I bambini entrano come gruppo nelle vasche. Sono sempre sorvegliate da almeno due animatori.",
            "LABEL_CANGOHOME_CHILD": "mio figlio/a può andare a casa da solo/a",
            "LABEL_PRECARE_CHILD": "  NUR BEI KINDERSOMMERPROGRAMMEN: Ich wünsche eine Beaufsichtigung meines Kindes von 08.00 - 09.00 Uhr (+15 Euro die Woche)",
            "LABEL_BANDNAME_CHILD": "Musikkapelle",
            "LABEL_INSTRUMENT_CHILD": "Instrument",
            "LABEL_YEARSINSTRUMENT_CHILD": "Ausbildungsjahr",
            "LABEL_HEALTHISSUES_CHILD": "problemi di salute",
            "LABEL_HEALTH_INCOMPATIBILITY": "intolleranzi",
            "LABEL_HEALTH_ALLERGY": "allergie",
            "LABEL_HEALTH_ILLNESS": "medicinali",
            "LABEL_DISABILITY_CHILD": "bambino/a con bisogni speciali",
            "LABEL_DISABILITY_CHILD_DESCRIPTION": "menomazioni",
            "LABEL_DIAGNOSTIC_CHILD_DESCRIPTION": "diagnosi",
            "LABEL_NAME_CONTACT1": "nome1",
            "LABEL_TEL_CONTACT1": "telefono 1",
            "LABEL_NAME_CONTACT2": "nome2",
            "LABEL_TEL_CONTACT2": "telefono 2",
            "LABEL_ABK_CHILD": "  Mi serve una conferma per EbK",
            "LABEL_HEIGHT_CHILD": "Körpergröße in cm",
            "LABEL_HASOWNEBIKE": "Ich benutze mein eigenes E-Bike",
            "INFO_EBK_1": "L&#39;EbK è il nome dell&#39; Ente Bilaterale per il settore commercio, turismo e servizi dell’ Alto Adige. Le prestazioni dell’EbK si rivolgono ai soci dell’EbK. EBK favorisce la conciliazione tra lavoro e famiglia e promuove iniziative di carattere sociale. I programmi estivi del Jugenddienst rappresentano un&#39; iniziativa del genere. Per qesto motivo è possibile ottenere un rimborso di una parte della quota d&#39;iscrizione. Le chiediamo di informarsi dal suo datore di lavoro, se fosse membro dell‘ EbK. Ulteriori informazioni sotto ebk.bz.it",
            "INFO_EBK_DOWNLOAD": "A fine luglio la conferma di partecipazione può essere scaricata su qusto sito sotto 'le mie prenotazioni'",
            "LABEL_TERMS1": "  accetto ",
            "LABEL_TERMS2": "termini e condizioni",
            "LABEL_TERMS3": " E prendo in considerazione il trattamento dei dati personali e prendo atto delle ",
            "LABEL_TERMS4": " norme sulla protezione dei dati ",
            "LABEL_TERMS5": " .",
            "LABEL_INSUR1": "  letto e accettato",
            "LABEL_INSUR2": "termini e condizioni",
            "LABEL_PRIVACY1": " dichiaro di aver letto ",
            "LABEL_PRIVACY2": " l'informativa sulla privacy ",
            "LABEL_PRIVACY3": " di questo sito web.",
            "LABEL_MEDIA1": " con la presente ",
            "LABEL_MEDIA2": " autorizzo l'uso legittimo ",
            "LABEL_MEDIA3": " di materiale fotografico e cinematografico.",
            "LABEL_MEDIA1_JDBL": " Accetto tramite clic sul rispettivo tasto, che i miei dati personali, il mio nome, cognome e la mia foto verranno trattati secondo il punto 10 della ",
            "LABEL_MEDIA2_JDBL": " dichirazione sulla protezione dei dati ",
            "LABEL_MEDIA3_JDBL": " per l uso nei media per i fini elencati.",
            "LABEL_HEALTH1_JDBL": " Con la firma e il clic sul rispettivo tasto approvo che i dati sulla sanità nel punto 9  ",
            "LABEL_HEALTH2_JDBL": " (vedi norme sulla protezione dei dati) ",
            "LABEL_HEALTH3_JDBL": " verranno trattati secondo i fini lì elencati.",
            "LABEL_REGISTER": "iscrizione",
            "LABEL_REGISTRATION_PAY_INFO": "Il versamento della quota d’iscrizione è vincolante dopo l'iscrizione",
            "LABEL_REGISTRATION_RECEIPT_INFO": "La conferma d'iscrizione  viene inviata via email",
            "LABEL_NEWSLETTER": " voglio ricevere una newsletter per progetti futuri",
            "LABEL_OPTIONALPAYMENT": " vorrei fare una donazione volontaria (10EUR)",
            "BUTTON_SUBMIT": "Invio iscrizione",
            "BUTTON_NEXT": "Avanti",
            "BUTTON_PREVIOUS": "Indietro",
            "MSG_SUCCESS": "Iscrizione salvata con successo",
            "MSG_NO_DUPLICATES": "Non sono possibili iscrizione doppie per la stessa settimana",
            "MSG_ERROR": "Si è verificato un problema durante l'accesso. Si prega di effetturare nuovamente l'accesso.",
            "MSG_FORM_NOT_VALID": "Il modulo non contiene voci valide"
        },
        "MYRESERVATION": {
            "TITLE": "Prenotazioni",
            "NOTE": "L‘avviso di pagamento verrà inviato entro a marzo. Grazie per la sua prenotazione!",
            "NOTE_KISO": "Nei prossimi giorni vi informereno via e-mail se siete arrivati tra le prime 45 iscrizioni o se avete un posto in lista d'attesa",
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
            "LABEL_TEL_PARENT": "telefono genitore",
            "LABEL_DOWNLOAD_CONFIRMATION": "EbK Bestätigung"
        }
    };
}(this));
