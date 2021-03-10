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
            if(act.name.subString(0,4) == "1. W") { act.curParticipants = 49; }
            if(act.name.subString(0,4) == "2. W") { act.curParticipants = 58; }
            if(act.name.subString(0,4) == "3. W") { act.curParticipants = 59; }
            if(act.name.subString(0,4) == "4. W") { act.curParticipants = 56; }
            if(act.name.subString(0,4) == "5. W") { act.curParticipants = 54; }
            if(act.name.subString(0,4) == "6. W") { act.curParticipants = 47; }
            if(act.name.subString(0,4) == "7. W") { act.curParticipants = 36; }

            
            if(verbose) {
                console.log(chalk.cyan(act.name));
                console.log(chalk.cyan(act.curParticipants));
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