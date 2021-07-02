const Registration = require('./../server/models/registration');
const Activity = require('./../server/models/activity');
const chalk = require('chalk');
const mongoose = require('mongoose');
const moment = require('moment');

const main = async() => {
    let activityFrom = await Activity.findById(mongoose.Types.ObjectId("6007f2ace6146a8dab8c9b28"));
    let activityTo = await Activity.findById(mongoose.Types.ObjectId("6007f35c11614b82bd00c702"));
    
    let reg = await Registration.findById(mongoose.Types.ObjectId("6056ef75d858d9260c57d5be"));
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