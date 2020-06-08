const Registration = require('./../server/models/registration');
const mongoose = require('mongoose');
const chalk = require('chalk');

const regIds = [ mongoose.Types.ObjectId("5ece0a480ad3c97f46cb9705"),
                 mongoose.Types.ObjectId("5ec7c5b42f34e8490c4950ab"),
                 mongoose.Types.ObjectId("5ec7c5b42f34e8490c4950ac"),
                 mongoose.Types.ObjectId("5ec75d1b38076bc51182e5cf"),
                 mongoose.Types.ObjectId("5ecc1fe84424d689dec15953") ];



const main = async() => {
    

    for(let i = 0; i < regIds.length; i++) {
        const reg = await Registration.findById(regIds[i]);
        reg.registrationDate = new Date("2020-06-08");
        try {
            await reg.save();
            console.log(chalk.green("registration ", reg._id));
        } catch(err) {
            console.log(chalk.red("error reg: ", err));
        }
    }

    process.exit(1);
}

main();