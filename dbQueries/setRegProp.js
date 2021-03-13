const Registration = require('./../server/models/registration');
const chalk = require('chalk');
const mongoose = require('mongoose');

const main = async() => {

    
    //let reg = await Registration.findById(mongoose.Types.ObjectId("604815c86cd56d710de28013"));
    let reg = new Registration(
        {
                    covidRules: {
                      isAtRisk: false,
                      isPrioWork: false,
                      isPrioSocial: false,
                      isPrioNone: false
                    },
                    transferStatus: { move: false, unavailable: false, waitlist: false },
                    addressChild: 'Piazza Mazzini 8/B',
                    cityChild: 'Bozen',
                    hasOwnEBike: false,
                    isPaymentDone: false,
                    isEmailNotified: false,
                    needsPreCare: false,
                    hasHealthIssues: false,
                    hasDisability: false,
                    needsEbK: false,
                    canSwim: false,
                    canGoHomeAllone: false,
                    isSiblingReservation: true,
                    acceptsOptionalFee: false,
                    asksForReduction: false,
                    acceptsNewsletter: false,
                    acceptsMediaPublication: true,
                    isPrioUp: false,
                    isPrioDown: false,
                    isRefunded: false,
                    gender: 'male',
                    wasWaiting: false,
                    _id: mongoose.Types.ObjectId("604815c86cd56d710de28016"),
                    registrationDate: new Date("2021-03-02T06:20:17.000Z"),
                    firstNameParent: 'Lukas',
                    lastNameParent: 'Steinmair',
                    phoneNumberParent: '3479569832',
                    emailParent: 'lukas.steinmair@hotmail.com',
                    firstNameChild: 'Benno',
                    lastNameChild: 'Steinmair',
                    birthdayChild: new Date("2012-09-10T00:00:00.000Z"),
                    schoolChild: '3. Klasse Grundschule',
                    taxNumber: 'STNBNN12P10B220X',
                    nameContact1: 'Anna Maria Bogana',
                    telContact1: '3396103134',
                    nameContact2: 'Steffi Fink',
                    telContact2: '3396785319',
                    activityId: mongoose.Types.ObjectId("6038aeea1b6ec0909019ab15"),
                    tShirtSize: '7-8 Jahre/122-128cm',
                    preferredFellow: '',
                    healthIllnes: 'nein',
                    disabilityDescription: 'nein',
                    userId: mongoose.Types.ObjectId("6034dd98584ebf0334d7a5e1") 
                  }
    ); 
    let valErr = reg.validateSync();
    console.log("error", valErr);
    await reg.save();
    console.log(reg);

    console.log(chalk.green("Done"));

    process.exit(1);
}

main();