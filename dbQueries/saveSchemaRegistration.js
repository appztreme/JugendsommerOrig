const Registration = require('./../server/models/registration');
const chalk = require('chalk');

const main = async() => {

    const registrations = await Registration.find();
    for(let i = 0; i < registrations.length; i++) {
        registrations[i].save();
    }
    //reg.save();
    console.log(chalk.green("Done"));

    process.exit(1);
}

main();
