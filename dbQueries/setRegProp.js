const Registration = require('./../server/models/registration');
const Activity = require('./../server/models/activity');
const chalk = require('chalk');
const mongoose = require('mongoose');
const moment = require('moment');

const main = async() => {
    let activityFrom = await Activity.findById(mongoose.Types.ObjectId("6007f28c11614b82bd00c701"));
    let activityTo = await Activity.findById(mongoose.Types.ObjectId("6007f33e5747a38d9c9c3ddb"));
    
    let reg = await Registration.findById(mongoose.Types.ObjectId("6056ef75d858d9260c57d5bd"));
    reg.activityId = activityTo._id;

    await reg.save();

    activityFrom.curParticipants -= 1;
    activityTo.curParticipants += 1;

    await activityFrom.save();
    await activityTo.save();

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