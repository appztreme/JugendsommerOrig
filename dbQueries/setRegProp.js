const Registration = require('./../server/models/registration');
const chalk = require('chalk');
const mongoose = require('mongoose');
const moment = require('moment');

const main = async() => {

    
    let reg = await Registration.findById(mongoose.Types.ObjectId("602ac72ffbd219b240426984"));
    reg.activityId = mongoose.Types.ObjectId("6007f2fbe6146a8dab8c9b29");
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