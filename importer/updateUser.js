const Registration = require('./../server/models/registration');
const chalk = require('chalk');
const mongoose = require('mongoose');
const registrationToUpdate = require('./user_registration.json');

const main = async() => {

    for(let up of registrationToUpdate) {
        let reg = await Registration.find()
            .where('firstNameChild').equals(up.firstNameChild)
            .where('lastNameChild').equals(up.lastNameChild)
            .where('birthdayChild').equals(new Date(up.birthdayChild))
            .where('emailParent').equals(up.emailParent)
            .where('activityId').equals(mongoose.Types.ObjectId(up.activityId));

        if(! reg) { console.log(chalk.red(`${up.firstNameChild} + ${up.lastNameChild} in ${up.activityId} not found!`))}
        else {
            // reg.userId = mongoose.Types.ObjectId(up.userId);
            // await reg.save();
        }
    }
    console.log(chalk.green("Done"));

    process.exit(1);
}

main();