const Registration = require('./../server/models/registration');
const chalk = require('chalk');

const main = async() => {

    const reg = await Registration.findOne();
    reg.save();

    process.exit(1);
}

main();
