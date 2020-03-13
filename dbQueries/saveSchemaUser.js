const User = require('./../server/models/user');
const chalk = require('chalk');

const main = async() => {

    const users = await User.find().exec();
    console.log(chalk.green("number users:", users.length));
    try {
    for(let i = 0; i < users.length; i++) {
        const u = users[i];
        await u.save();
    }
    } catch(err) {
        console.log(chalk.red(err));
    }
    console.log(chalk.green("Done"));

    process.exit(1);
}

main();