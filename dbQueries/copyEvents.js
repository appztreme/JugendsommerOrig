const Event = require('./../server/models/event');
const Activity = require('./../server/models/activity');
const chalk = require('chalk');

const year = 2018;
const verbose = true;
const dryRun = true;


const main = async() => {
    const events = await Event.find().where('startDate').gte(new Date(`${year}-01-01`)).exec();
    
    for(let i = 0; i < events.length; i++) {
        const ev = events[i];
        let newEvent = new Event();
        newEvent.name = ev.name;
        newEvent.name_it = ev.name_it;
        newEvent.description = ev.description;
        newEvent.description_it = ev.description_it;
        newEvent.type = ev.type;
        newEvent.location = ev.location;
        newEvent.location_it = ev.location_it;
        newEvent.startDate = ev.startDate;
        newEvent.endDate = ev.endDate;
        newEvent.visibleFrom = ev.visibleFrom;
        newEvent.visibleTo = ev.visibleTo;
        newEvent.deadline = ev.deadline;
        newEvent.penalty = ev.penalty;
        newEvent.budgetBusiness = ev.budgetBusiness;
        newEvent.budgetFood = ev.budgetFood;
        newEvent.feePerWeek = ev.feePerWeek;
        newEvent.info = ev.info;
        newEvent.info_it = ev.info_it;
        newEvent.isInternal = ev.isInternal;
        newEvent.contacts = ev.contacts;
        newEvent.contactRels = ev.contactRels;

        newEvent.startDate.setFullYear(newEvent.startDate.getFullYear() + 1);
        newEvent.endDate.setFullYear(newEvent.endDate.getFullYear() + 1)
        newEvent.visibleFrom.setFullYear(newEvent.visibleFrom.getFullYear() + 1);
        newEvent.visibleTo.setFullYear(newEvent.visibleTo.getFullYear() + 1);
        newEvent.deadline.setFullYear(newEvent.deadline.getFullYear() + 1);
        if(verbose) {
            console.log(chalk.blue("Existing Event:"))
            console.log(chalk.blue(ev));
            console.log(chalk.green("New Event:"))
            console.log(chalk.green(newEvent));
        }
        if(!dryRun) {
            try {
                await newEvent.save();
            } catch(eEv) {
                console.log(chalk.red("error Event:", eEv))
            }
        }
        

        const activities = await Activity.find().where('eventId').equals(ev._id);
        for(let j = 0; j < activities.length; j++) {
            const act = activities[j];
            let newActivity = new Activity();
            newActivity.name = act.name;
            newActivity.name_it = act.name_it;
            newActivity.description = act.description;
            newActivity.description_it = act.description_it;
            newActivity.startDate = act.startDate;
            newActivity.endDate = act.endDate;
            newActivity.eventId = newEvent._id;
            newActivity.maxParticipants = act.maxParticipants;
            newActivity.curParticipants = 0;
            newActivity.queueSize = act.queueSize;
            newActivity.contacts = act.contacts;
            newActivity.contactRels = act.contactRels;

            newActivity.startDate.setFullYear(newActivity.startDate.getFullYear() + 1);
            newActivity.endDate.setFullYear(newActivity.endDate.getFullYear() + 1);
            if(verbose) {
                console.log(chalk.yellow("Existing Activity:"))
                console.log(chalk.yellow(act));
                console.log(chalk.cyan("New Activity:"));
                console.log(chalk.cyan(newActivity));
            }
            if(!dryRun) {
                try {
                    await newActivity.save();
                } catch(eAct) {
                    console.log(chalk.red("error Activity:", eAct))
                }
                
            }
        }
        if(verbose) {
            console.log(chalk.red("===================================================="))
        }

    }

    process.exit(1);
}

main();