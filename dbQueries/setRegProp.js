const Registration = require('./../server/models/registration');
const chalk = require('chalk');
const mongoose = require('mongoose');
const moment = require('moment');

const main = async() => {

    
    let reg = await Registration.findById(mongoose.Types.ObjectId("60474d16617fd66c0b4639b2"));
    reg.activityId = mongoose.Types.ObjectId("6012838171532a61a2031936");
    //let newDate = moment(reg.registrationDate).add(-1, 'months').setDate(20);
    //reg.registrationDate = newDate;
    let valErr = reg.validateSync();
    console.log("error", valErr);
    await reg.save();
    console.log(reg);

    console.log(chalk.green("Done"));

    process.exit(1);
}

main();