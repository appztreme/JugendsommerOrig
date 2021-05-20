const Registration = require('./../server/models/registration');
const chalk = require('chalk');
const mongoose = require('mongoose');

const main = async() => {
    const fromActivityId = mongoose.Types.ObjectId("6007f11584f0e58db88c3af7");
    const toActivityId = mongoose.Types.ObjectId("6007f1605747a38d9c9c3dd7");

    const registrations = await Registration.find({activityId: fromActivityId}).exec();

    for(let i = 0; i < registrations.length; i++) {
        registrations[i].activityId = toActivityId;
        try {
            await registrations[i].save();
            console.log(chalk.green("registration: ", registrations[i]._id))
        } catch(err) {
            console.log(chalk.red("error Reg:", err));
        }
    }

    console.log(chalk.green("Done"));

    process.exit(1);
}

main();