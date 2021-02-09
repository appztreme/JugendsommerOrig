const Event = require('./../server/models/event');
const Activity = require('./../server/models/activity');
const chalk = require('chalk');

const year = 2021;
const verbose = true;


const main = async() => {
    const events = await Event.find().where('startDate').gte(new Date(`${year}-01-01`)).exec();
    
    for(let i = 0; i < events.length; i++) {
        const ev = events[i];

        const activities = await Activity.find().where('eventId').equals(ev._id);
        for(let j = 0; j < activities.length; j++) {
            const act = activities[j];
            act.curParticipants = 0;
            act.queueSize = 10;

            
            if(verbose) {
                console.log(chalk.cyan(act.name));
                console.log(chalk.cyan(act.curParticipants, act.queueSize));
            }
           try {
                await act.save();
            } catch(eAct) {
                console.log(chalk.red("error Activity:", eAct))
            }
        }
        if(verbose) {
            console.log(chalk.red("===================================================="))
        }

    }

    process.exit(1);
}

main();