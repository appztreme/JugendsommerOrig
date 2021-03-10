const parse = require('csv-parse');
const path = require('path');
const fs = require('fs');
const users = require('./data/users.json');
const mongoose = require('mongoose');
const moment = require('moment');

//const Event = require('./../server/models/event');
//const Activity = require('./../server/models/activity');
const Registration = require('./../server/models/registration');

const chalk = require('chalk');

const FILE_NAME_DE = 'kiso_2021_de.csv';
const FILE_NAME_IT = 'kiso_2021_it.csv';

function parseGender(local_gender) {
    if (local_gender == 'männlich') return "male";
    else if(local_gender == 'weiblich') return "female";
    else if(local_gender == 'femminile') return "female";
    else if(local_gender == 'maschile') return "male";
    else throw new Error(local_gender + " does not exist");
}

function parseSiblingReservation(siblingStr, lang) {
    if(lang == 'de') {
        if(siblingStr == 'Ja') return true;
        else if(siblingStr == 'Nein') return false;
        else if(siblingStr == '') return false;
        else throw new Error(siblingStr + ' is not supported in parseSiblingReservation with lang ' + lang);
    }
    else if(lang == 'it') {
        if(siblingStr == 'si') return true;
        else if(siblingStr == 'no') return false;
        else if(siblingStr == '') return false;
        else throw new Error(siblingStr + ' is not supported in parseSiblingReservation with lang ' + lang);
    }
    else throw new Error(lang + ' is not supported in parseSiblingReservation');
}

function parseTShirtSize(shirtStr, lang) {
    const sizes = [
        {"name": '3-4 Jahre/89-104cm',             "name_it": '3-4 anni/89-104cm'},
        {"name": '5-6 Jahre/110-116cm',            "name_it": '5-6 anni/110-116cm'},
        {"name": '7-8 Jahre/122-128cm',            "name_it": '7-8 anni/122-128cm'},
        {"name": '9-10 Jahre/134-140cm',           "name_it": '9-10 anni/134-140cm'},
        {"name": '11-12 Jahre/146-152cm',          "name_it": '11-12 anni/146-152cm'},
        {"name": '12-14 Jahre/152-164cm',          "name_it": '12-14 anni/152-164cm'},
        {"name": 'Erwachsenengröße S',             "name_it": 'Taglia adulto S'},
        {"name": 'Erwachsenengröße M',             "name_it": 'Taglia adulto M'},
        {"name": 'Erwachsenengröße L',             "name_it": 'Misura adulti L'},
        {"name": 'Erwachsenengröße XL',            "name_it": 'Misura adulti XL'},
    ]
    if(lang == 'de') {
        for(var i=0; i < sizes.length; i++) {
            if(sizes[i].name == shirtStr) return sizes[i].name;
        }
        throw new Error(shirtStr + ' is not supported in parseTShirtSize with lang ' + lang);
    }
    else if(lang == 'it') {
        for(var i=0; i < sizes.length; i++) {
            if(sizes[i].name_it == shirtStr) return sizes[i].name;
        }
        throw new Error(shirtStr + ' is not supported in parseTShirtSize with lang ' + lang);
    }
    else throw new Error(lang + ' is not supported in parseTShirtSize'); 
}

function parseRegDate(strDate) {
    const regDate = moment(strDate, "YYYY/MM/DD h:m:s");
    return regDate.toDate();
}

function parseUser(userName, Email) {
    for(var i=0; i < users.length; i++) {
        if(users[i].userName == userName) return users[i]._id;
        if(users[i].userEmail == userName) return users[i]._id;
        if(users[i].firstName + ' ' + users[i].lastName == userName) return users[i]._id;
        if(users[i].userName.replace(' ','') == userName.trim()) return users[i]._id;
        if(users[i].userName.toLowerCase() == userName.toLowerCase()) return users[i]._id;
        if(users[i].userEmail == Email) return users[i]._id;
        if(users[i].userEmail.toLowerCase() == Email.toLowerCase()) return users[i]._id;
        if(users[i].userEmail.toLowerCase().replace(' ','') == Email.toLowerCase().replace(' ','')) return users[i]._id;
    }
    console.log(chalk.red(userName + ' (' + Email + ') ' + ' not found in repo 2021'));
}

function findWeek(weeks, weekStr, lang) {
    for(var i=0; i < weeks.length; i++) {
        if(lang == 'de') {
            if(weeks[i].name == weekStr) return weeks[i]._id;
        }
        if(lang == 'it') {
            if(weeks[i].name_it == weekStr) return weeks[i]._id;
        }
    }
    throw new Error(weekStr + ' not found in repo for lang: ' + lang);
}

function parseHasIssues(issueStr, lang) {
    if(lang == 'de') {
        if(issueStr == '') return false;
        else if(issueStr.trim().toLowerCase() == 'no') return false;
        else if(issueStr.trim().toLowerCase() == 'nein') return false;
        else if(issueStr.trim().toLowerCase() == 'keine') return false;
        else if(issueStr.trim() == '-') return false;
        else if(issueStr.trim() == '/') return false;
        else if(issueStr.trim().toLowerCase() == 'nien') return false;
        else if(issueStr.trim().toLowerCase() == 'kein') return false;
        else if(issueStr.trim().toLowerCase() == 'non conosciuti') return false;
        else {
            console.log(chalk.blue(issueStr));
            return true;
        }  
    }
    else if(lang == 'it') {
        if(issueStr == '') return false;
        else if(issueStr.trim().toLowerCase() == 'no') return false;
        else if(issueStr.trim().toLowerCase() == 'nessuno') return false;
        else if(issueStr.trim().toLowerCase() == 'niente') return false;
        else if(issueStr.trim().toLowerCase() == 'non conosciuti') return false;
        else if(issueStr.trim() == '-') return false;
        else if(issueStr.trim() == '/') return false;
        else {
            console.log(chalk.blue(issueStr));
            return true;
        }
    }
    else throw new Error(lang + ' is not supported in parseHasHealthIssues');
}

function parseActivity2021(strWeek, lang) {
    const weeks = [
        { "_id" : "601029d2fadc13a71e1b944c", "name" : "21.06 - 25.06.2021", "name_it" : "21.06 - 25.06.2021"  },
        { "_id" : "6038abe37252de909162d31c", "name" : "28.06 - 02.07.2021", "name_it" : "28.06 - 02.07.2021" },
        { "_id" : "6038ac678064c2908f4d20d4", "name" : "05.07 - 09.07.2021", "name_it" : "05.07 - 09.07.2021" },
        { "_id" : "6038ae64cd4d5390868c4578", "name" : "12.07 - 16.07.2021", "name_it" : "12.07 - 16.07.2021" },
        { "_id" : "6038aeea1b6ec0909019ab15", "name" : "19.07 - 23.07.2021", "name_it" : "19.07 - 23.07.2021" },
        { "_id" : "6038af4e1b6ec0909019ab16", "name" : "26.07 - 30.07.2021", "name_it" : "26.07 - 30.07.2021" },
        { "_id" : "6038afd0cd4d5390868c4579", "name" : '02.08 - 06.08.2021 (nur in Mittelschule "Ugo Foscolo")', "name_it" : "02.08 - 06.08.2021" }
    ];
    if(lang == 'de') {
        return findWeek(weeks, strWeek, 'de');
    }
    else if(lang == 'it') {
        return findWeek(weeks, strWeek, 'it');
    }
    else throw new Error(lang + ' is not supported in parseActivity2021');
}

function parseMedia(str, lang) {
    if(lang == 'de') {
        if(str.includes("Ich willige mittels Anklicken des entsprechenden Buttons ein, dass Name und Nachnamen sowie Lichtbild für die in Punkt 10 der Datenschutzerklärung genannten Zwecke in den dort genannten Medien verwendet werden können.")) return true;
        else return false;
    }
    else if(lang == 'it') {
        if(str.includes("Cliccando il pulsante corrispondente, accetto che il mio nome e cognome e la mia fotografia possano essere utilizzati per gli")) return true;
        else {
            //console.log(chalk.yellow(str));
            return false;
        }
        
    }
    else throw new Error(lang + ' is not supported in parseMedia');
}

function parseNews(str, lang) {
    if(lang == 'de') {
        if(str.includes("Ich möchte über altersspezifische Projekte für mein Kind Informiert werden.")) return true;
        else return false;
        //console.log(chalk.yellow(str));
    }
    else if(lang == 'it') {
        if(str.includes("Vorrei essere informato sui progetti specifici per l'età del/la mio/a figlio/a.")) return true;
        else return false;
        //console.log(chalk.yellow(str));
    }
    else throw new Error(lang + ' is not supported in parseMedia');
}

function parseOptional(str, lang) {
    if(lang == 'de') {
        if(str.includes("10 EUR Spende")) return true;
        else return false;
    }
    else if(lang == 'it') {
        if(str.includes("10 EUR donazione")) return true;
        else return false;
    }
    else throw new Error(lang + ' is not supported in parseOptional');
}

function parseReduction(str, lang) {
    if(lang == 'de') {
        if(str.includes("10 EUR Rabatt")) return true;
        else return false;
    }
    else if(lang == 'it') {
        if(str.includes("10 EUR sconto")) return true;
        else return false;
    }
    else throw new Error(lang + ' is not supported in parseReduction'); 
}

const transformSchemaDE = (row) => {
    return {
        userId: mongoose.Types.ObjectId(parseUser(row["Benutzername des angelegten Kontos auf www.kiso.bz.it"], row["Email"])),
        registrationDate: parseRegDate(row["Zeitstempel"]),
        firstNameParent: row["Vorname Elternteil"],
        lastNameParent: row["Familienname Elternteil"],
        phoneNumberParent: row["Tel"],
        emailParent: row["Email"],
        firstNameChild: row["Vorname Kind"],
        lastNameChild: row["Familienname Kind"],
        gender: parseGender(row["Geschlecht"]),
        birthdayChild: new Date(row["Geburtsdatum Kind"]),
        schoolChild: row["Besuchte Klasse 2020/21"],
        addressChild: row["Adresse"],
        cityChild: row["Wohnort"],
        taxNumber: row["Steuernummer"],
        nameContact1: row["Notfallkontakt 1"],
        telContact1: row["Telefon 1"],
        nameContact2: row["Notfallkontakt 2"],
        telContact2: row["Telefon 2"],
        activityId: mongoose.Types.ObjectId(parseActivity2021(row["Kiso - Kindersommer"], 'de')),
        tShirtSize: parseTShirtSize(row["T-Shirt Size"], 'de'),
        isSiblingReservation: parseSiblingReservation(row["Handelt es sich um ein Geschwisterkind, das an der selben KiSo-Woche teilnimmt? (=Skonto 10 Euro)"], 'de'),
        preferredFellow: row["Freund*in des Kindes (für Gruppeneinteilung - ohne Gewähr)"],
        hasHealthIssues: parseHasIssues(row["Gesundheitliche Probleme (Unverträglichkeiten, etc.)?"], 'de'),
        healthIllnes: row["Gesundheitliche Probleme (Unverträglichkeiten, etc.)?"],
        hasDisability: parseHasIssues(row["Kind mit Beeinträchtigung?"], 'de'),
        disabilityDescription: row["Kind mit Beeinträchtigung?"],
        acceptsMediaPublication: parseMedia(row["Mit dem Anklicken eines Kästchen bestätigen Sie die jeweilige Aussage."], 'de'),
        acceptsNewsletter: parseNews(row["Mit dem Anklicken eines Kästchen bestätigen Sie die jeweilige Aussage."], 'de'),
        acceptsOptionalFee: parseOptional(row["freiwillige monetäre Hilfe:"], 'de'),
        asksForReduction: parseReduction(row["freiwillige monetäre Hilfe:"], 'de'),
    }
}

const transformSchemaIT = (row) => {
    return {
        userId: mongoose.Types.ObjectId(parseUser(row["Nome utente del account creato su www.kiso.bz.it"], row["Email"])),
        registrationDate: parseRegDate(row["Zeitstempel"]),
        firstNameParent: row["Nome genitore"],
        lastNameParent: row["Cognome genitore"],
        phoneNumberParent: row["Tel"],
        emailParent: row["Email"],
        firstNameChild: row["Nome bambino/a"],
        lastNameChild: row["Cognome bambino/a"],
        gender: parseGender(row["Sesso"]),
        birthdayChild: new Date(row["Data di nascita del bambino/della bambina"]),
        schoolChild: row["Classe frequentata 2020/21"],
        addressChild: row["Indirizzo"],
        cityChild: row["Comune di residenza"],
        taxNumber: row["Codice fiscale"],
        nameContact1: row["Nome contatto emergenza 1"],
        telContact1: row["Telefono 1"],
        nameContact2: row["Nome contatto emergenza 2"],
        telContact2: row["Telefono 2"],
        activityId: mongoose.Types.ObjectId(parseActivity2021(row["KiSo"], 'it')),
        tShirtSize: parseTShirtSize(row["T-Shirt Size"], 'it'),
        isSiblingReservation: parseSiblingReservation(row["Si tratta di un fratello/sorella che partecipa alla stessa settimana KiSo? (= sconto di 10 Euro)"], 'it'),
        preferredFellow: row["Amico/a del bambino/della bambina (per il ragruppamento - senza garanzia)"],
        hasHealthIssues: parseHasIssues(row["Problemi di salute (es. intolleranze alimentari)?"],'it'),
        healthIllnes: row["Problemi di salute (es. intolleranze alimentari)?"],
        hasDisability: parseHasIssues(row["Bambino/a con menomazioni?"], 'it'),
        disabilityDescription: row["Bambino/a con menomazioni?"],
        acceptsMediaPublication: parseMedia(row["Cliccando su una casella si conferma la rispettiva dichiarazione."], 'it'),
        acceptsNewsletter: parseNews(row["Cliccando su una casella si conferma la rispettiva dichiarazione."], 'it'),
        acceptsOptionalFee: parseOptional(row["Aiuto monetario (volontario):"], 'it'),
        asksForReduction: parseReduction(row["Aiuto monetario (volontario):"], 'it'),
    }
}

const processFile = async (fName, transformer) => {
    let records = []
    const parser = fs
    .createReadStream(fName)
    .pipe(parse({columns: true}));
    for await (const record of parser) {
        records.push(transformer(record))
    }
    return records
}

const loadCSV = async () => {
    let result = [];
    let fde = await processFile(path.resolve(__dirname, 'data', FILE_NAME_DE), transformSchemaDE);
    let fit = await processFile(path.resolve(__dirname, 'data', FILE_NAME_IT), transformSchemaIT);
    for(let rde of fde) { result.push(rde); }
    for(let rit of fit) { result.push(rit); }
    return result;
}

const loadMissing = async () => {
    let result = [];
    let fde = await processFile(path.resolve(__dirname, 'data', "kiso_2021_de_missing.csv"), transformSchemaDE);
    for(let rde of fde) { result.push(rde); }
    return result; 
}

(async () => {
    let records = await loadMissing();
    records.sort((a,b) => a.registrationDate - b.registrationDate);
    //console.info(records);
    for(let rec of records) {
        let r = new Registration();
        r.userId = rec.userId;
        r.registrationDate = rec.registrationDate;
        r.firstNameParent = rec.firstNameParent;
        r.lastNameParent = rec.lastNameParent;
        r.phoneNumberParent = rec.phoneNumberParent;
        r.emailParent = rec.emailParent;
        r.firstNameChild = rec.firstNameChild;
        r.lastNameChild = rec.lastNameChild;
        r.gender = rec.gender;
        r.birthdayChild = rec.birthdayChild;
        r.schoolChild = rec.schoolChild;
        r.addressChild = rec.addressChild;
        r.cityChild = rec.cityChild;
        r.taxNumber = rec.taxNumber;
        r.nameContact1 = rec.nameContact1;
        r.telContact1 = rec.telContact1;
        r.nameContact2 = rec.nameContact2;
        r.telContact2 = rec.telContact2;
        r.activityId = rec.activityId;
        r.tShirtSize = rec.tShirtSize;
        r.isSiblingReservation = rec.isSiblingReservation;
        r.preferredFellow = rec.preferredFellow;
        r.hasHealthIssues = rec.hasHealthIssues;
        r.healthIllnes = rec.healthIllnes;
        r.hasDisability = rec.hasDisability;
        r.disabilityDescription = rec.disabilityDescription;
        r.acceptsMediaPublication = rec.acceptsMediaPublication;
        r.acceptsNewsletter = rec.acceptsNewsletter;
        r.acceptsOptionalFee = rec.acceptsOptionalFee;
        r.asksForReduction = rec.asksForReduction;
        let errorVal = r.validateSync();
        if(errorVal) console.log(chalk.blue(errorVal));
        console.log(r);
    //     // try {
    //     //     await r.save();
    //     // } catch(errSave) {
    //     //     console.log(chalk.red(errSave));
    //     // }
     }
    console.log(chalk.blue("END"));
})()


