const Registration = require('./../server/models/registration');
const chalk = require('chalk');

const main = async() => {

    const registrations = await Registration.find().exec();
    console.log(chalk.green("number registrations:", registrations.length));
    try {
    for(let i = 0; i < registrations.length; i++) {
        const reg = registrations[i];
        reg.isPrioUp = false;
        reg.isPrioDown = false;
        console.log(chalk.red(reg.isPrioUp))
        reg.save();
    }
    } catch(err) {
        console.log(chalk.red(err));
    }
    //reg.save();
    console.log(chalk.green("Done"));

    process.exit(1);
}

main();
