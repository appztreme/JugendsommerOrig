const Registration = require('./../server/models/registration');
const Activity = require('./../server/models/activity');
const chalk = require('chalk');
const mongoose = require('mongoose');
const moment = require('moment');

const main = async() => {
    let activityFrom = await Activity.findById(mongoose.Types.ObjectId("6007f0f984f0e58db88c3af6"));
    let activityTo = await Activity.findById(mongoose.Types.ObjectId("6007efbe11614b82bd00c6fc"));
    
    let reg = await Registration.findById(mongoose.Types.ObjectId("603f805940f05f248a09ad5b"));
    //let reg2 = await Registration.findById(mongoose.Types.ObjectId("603f7ff67000f62488c35e30"));
    reg.activityId = activityTo._id;

    reg.save();

    activityFrom.curParticipants -= 1;
    activityTo.curParticipants += 1;

    activityFrom.save();
    activityTo.save();

    //let newDate = moment(reg.registrationDate).add(-1, 'months').setDate(20);
    //reg.registrationDate = newDate;
    // let valErr = reg.validateSync();
    // console.log("error", valErr);
    // await reg.save();
    // console.log(reg);

    console.log(chalk.green("Done"));

    process.exit(1);
}

main();