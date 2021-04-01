const Registration = require('./../server/models/registration');
const chalk = require('chalk');
const mongoose = require('mongoose');

const main = async() => {

    
    let reg = await Registration.findById(mongoose.Types.ObjectId("603f28d96abc3576b0bd223b")); //603f28d96abc3576b0bd223c
    reg.registrationDate.setMonth(2);
    reg.registrationDate.setDate(20);
    let valErr = reg.validateSync();
    console.log("error", valErr);
    await reg.save();
    console.log(reg);

    console.log(chalk.green("Done"));

    process.exit(1);
}

main();