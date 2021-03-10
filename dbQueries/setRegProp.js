const Registration = require('./../server/models/registration');
const chalk = require('chalk');
const mongoose = require('mongoose');

const main = async() => {

    let reg = await Registration.findById(mongoose.Types.ObjectId("604815c86cd56d710de28013"));
    reg.save();
    
    //console.log(chalk.green("number registrations:", registrations.length));
    // try {
    //     const regid1 = "";
    //     const regDate1 = new Date("2021-03-02T06:10:20.000Z");

    //     const reg1 = await Registration.findById(mongoose.Types.ObjectId(regid1));
    //     reg1.registrationDate = regDate1;
    //     reg1.emailParent = "lukas.steinmair@hotmail.com";
    //     reg1.userId = mongoose.Types.ObjectId("6034dd98584ebf0334d7a5e1");
    //     await reg1.save();
    // } catch(err1) {
    //     console.log(chalk.red(err1));
    // }

    // try {
    //     const regid2 = "";
    //     const regDate2 = new Date("");

    //     const reg2 = await Registration.findById(mongoose.Types.ObjectId(regid2));
    //     reg2.registrationDate = regDate2;
    //     reg2.emailParent = "lukas.steinmair@hotmail.com";
    //     reg2.userId = mongoose.Types.ObjectId("6034dd98584ebf0334d7a5e1");
    //     await reg2.save();
    // } catch(err2) {
    //     console.log(chalk.red(err2));
    // }

    // try {
    //     const regid3 = "";
    //     const regDate3 = new Date("");

    //     const reg3 = await Registration.findById(mongoose.Types.ObjectId(regid3));
    //     reg3.registrationDate = regDate3;
    //     reg3.emailParent = "lukas.steinmair@hotmail.com";
    //     reg3.userId = mongoose.Types.ObjectId("6034dd98584ebf0334d7a5e1");
    //     await reg3.save();
    // } catch(err3) {
    //     console.log(chalk.red(err3));
    // }

    // try {
    //     const regid4 = "";
    //     const regDate4 = new Date("");

    //     const reg4 = await Registration.findById(mongoose.Types.ObjectId(regid4));
    //     reg4.registrationDate = regDate4;
    //     reg4.emailParent = "lukas.steinmair@hotmail.com";
    //     reg4.userId = mongoose.Types.ObjectId("6034dd98584ebf0334d7a5e1");
    //     await reg4.save();
    // } catch(err4) {
    //     console.log(chalk.red(err4));
    // }

    console.log(chalk.green("Done"));

    process.exit(1);
}

main();