'use strict';
const args = require('args');
const chalk = require('chalk');
const Event = require('./server/models/event');
const activityRepo = require('./server/repositories/activity');
const registrationRepo = require('./server/repositories/registration');

args.option('log', 'show reservations against current status')
    .option('update', 'update counter if not equal');
var flags = args.parse(process.argv);

const curYear = 2018;


const main = async () => {
    if(flags.log) {
        const activities = await activityRepo.findForCurrentYear();
        for(var i=0; i < activities.length; i++) {
            let a = activities[i];
            let rs = await registrationRepo.filter(curYear, null, null, a._id, null);
            let mismatch = a.curParticipants !== rs.length;
            console.log(chalk.yellow("NAME         , MAX, CUR, COUNT"));
            console.log(chalk.yellow(a.name, a.maxParticipants, a.curParticipants, rs.length));
            if(mismatch) { console.log(chalk.red("MISMATCH")) }
            if(flags.update && mismatch) {
                a.curParticipants = rs.length;
                await a.save();
                console.log(chalk.green("changed"));
            }
        }
    }
    process.exit(1);
}
console.log(chalk.green("=========================="));
console.log(chalk.green("PARAMETERS:"));
console.log(chalk.green("--log: " + flags.log));
console.log(chalk.green("--update: " + flags.update));
console.log(chalk.green("=========================="));
main();
