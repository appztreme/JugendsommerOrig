const Event = require('./../server/models/event');
const chalk = require('chalk');

const year = 2020;
const verbose = true;
const dryRun = true;

const name_old = "Völs";
const name_new = "Fiè allo Sciliar";


const main = async() => {
    const events = await Event.find().where('startDate').gte(new Date(`${year}-01-01`)).exec();
    
    for(let i = 0; i < events.length; i++) {
        const ev = events[i];
        console.log(chalk.green(ev.name_it));
        if(ev.name_it === name_old) {
            ev.name_it = name_new;

            if(verbose) {
                console.log(chalk.blue(ev.name));
                console.log(chalk.blue(ev.name_it));
            }
            if(!dryRun) {
                try {
                    await newEvent.save();
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