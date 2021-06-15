const Registration = require('./../server/models/registration');
const Activity = require('./../server/models/activity')
const chalk = require('chalk');
const mongoose = require('mongoose');

const main = async() => {
    const w5RittenJSActivityId = mongoose.Types.ObjectId("6007f2fbe6146a8dab8c9b29");
    const w5RittenAktivActivityId = mongoose.Types.ObjectId("6007f39811614b82bd00c703");

    const w5RittenJSActivity = await Activity.findById(w5RittenJSActivityId);
    const w5RittenAktivActivity = await Activity.findById(w5RittenAktivActivityId);

    w5RittenJSActivity.curParticipants = 21;
    w5RittenAktivActivity.curParticipants = 18;

    await w5RittenJSActivity.save();
    await w5RittenAktivActivity.save();

    // const reg = await Registration.findById(mongoose.Types.ObjectId("602ac72ffbd219b240426984"));
    // reg.activityId = toActivityId;
    // await reg.save();



    // const registrations = await Registration.find({activityId: fromActivityId}).exec();

    // for(let i = 0; i < registrations.length; i++) {
    //     registrations[i].activityId = toActivityId;
    //     try {
    //         await registrations[i].save();
    //         console.log(chalk.green("registration: ", registrations[i]._id))
    //     } catch(err) {
    //         console.log(chalk.red("error Reg:", err));
    //     }
    // }

    console.log(chalk.green("Done"));

    process.exit(1);
}

main();