const Registration = require('./../server/models/registration');
const mongoose = require('mongoose');
const chalk = require('chalk');

const fromActivityId = "111111111111111111111108";
const toActivityId = "111111111111111111111101";


const main = async() => {
    const registrations = await Registration.find({activityId: mongoose.Types.ObjectId(fromActivityId)}).exec();

    for(let i = 0; i < registrations.length; i++) {
        registrations[i].activityId = mongoose.Types.ObjectId(toActivityId);
        try {
            await registrations[i].save();
            console.log(chalk.green("registration: ", registrations[i]._id))
        } catch(err) {
            console.log(chalk.red("error Reg:", err));
        }
    }

    process.exit(1);
}

main();