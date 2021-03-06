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
            //.where('emailParent').equals(up.emailParent)
            .where('activityId').equals(mongoose.Types.ObjectId(up.activityId));

        if(! reg[0] && reg.length != 1 && !reg.userId) { console.log(chalk.red(`${up.firstNameChild} + ${up.lastNameChild} birthday ${up.birthdayChild} emailParent: ${up.emailParent} in ${up.activityId} not found!`))}
        else {
            reg[0].userId = mongoose.Types.ObjectId(up.userId);
            await reg[0].save();
            console.log(chalk.blue("updated " + up.lastNameChild));
        }
    }
    console.log(chalk.green("Done"));

    process.exit(1);
}

main();