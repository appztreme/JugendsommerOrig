const Event = require('./../server/models/event');
const chalk = require('chalk');

const year = 2020;
const verbose = true;
const dryRun = false;

const name_old = "Vöran";
const name_new = "Verano";


const main = async() => {
    const events = await Event.find().where('startDate').gte(new Date(`${year}-01-01`)).exec();
    
    for(let i = 0; i < events.length; i++) {
        const ev = events[i];
        console.log(chalk.green(ev.location_it));
        if(ev.location_it === name_old) {
            ev.location_it = name_new;

            if(verbose) {
                console.log(chalk.blue(ev.location));
                console.log(chalk.blue(ev.location_it));
            }
            if(!dryRun) {
                try {
                    await ev.save();
                } catch(eEv) {
                    console.log(chalk.red("error Event:", eEv))
                }
            }
        }
        console.log(chalk.red("==============="));
    }

    process.exit(1);
}

main();