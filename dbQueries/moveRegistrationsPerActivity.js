const Registration = require('./../server/models/registration');
const Activity = require('./../server/models/activity');
const mongoose = require('mongoose');
const chalk = require('chalk');

const fromActivityId = mongoose.Types.ObjectId("5ec587d255a33f0640624992");
const toActivityId = mongoose.Types.ObjectId("5ec588fc9f77f1063fb8dbba");


const main = async() => {
    const registrations = await Registration.find({activityId: fromActivityId}).exec();
    const fromActivity = await Activity.findById(fromActivityId);
    const toActivity = await Activity.findById(toActivityId);

    for(let i = 0; i < registrations.length; i++) {
        registrations[i].activityId = toActivityId;
        fromActivity.curParticipants -= 1;
        toActivity.curParticipants += 1;
        try {
            await registrations[i].save();
            await fromActivity.save();
            await toActivity.save();
            console.log(chalk.green("registration: ", registrations[i]._id))
        } catch(err) {
            console.log(chalk.red("error Reg:", err));
        }
    }

    process.exit(1);
}

main();