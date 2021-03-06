const parse = require('csv-parse');
const path = require('path');
const fs = require('fs');
const users = require('./data/users.json');

const moment = require('moment');

const Event = require('./../server/models/event');
const Activity = require('./../server/models/activity');
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
    return regDate;
}

function parseUser(userName) {
    for(var i=0; i < users.length; i++) {
        if(users[i].userName == userName) return users[i]._id;
    }
    console.log(chalk.red(userName + ' not found in repo 2021'));
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

const transformSchemaDE = (row) => {
    return {
        userName: parseUser(row["Benutzername des angelegten Kontos auf www.kiso.bz.it"]),
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
        activityId: parseActivity2021(row["Kiso - Kindersommer"], 'de'),
        tShirtSize: parseTShirtSize(row["T-Shirt Size"], 'de'),
        isSiblingReservation: parseSiblingReservation(row["Handelt es sich um ein Geschwisterkind, das an der selben KiSo-Woche teilnimmt? (=Skonto 10 Euro)"], 'de'),
        preferredFellow: row["Freund*in des Kindes (für Gruppeneinteilung - ohne Gewähr)"],
    }
}

const transformSchemaIT = (row) => {
    return {
        userName: parseUser(row["Nome utente del account creato su www.kiso.bz.it"]),
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
        activityId: parseActivity2021(row["KiSo"], 'it'),
        tShirtSize: parseTShirtSize(row["T-Shirt Size"], 'it'),
        isSiblingReservation: parseSiblingReservation(row["Si tratta di un fratello/sorella che partecipa alla stessa settimana KiSo? (= sconto di 10 Euro)"], 'it'),
        preferredFellow: row["Amico/a del bambino/della bambina (per il ragruppamento - senza garanzia)"]
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

(async () => {
    const records = await loadCSV();
    //console.info(records);
})()


