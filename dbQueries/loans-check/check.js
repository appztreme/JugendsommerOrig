const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

const data = require("./loans.json");
const articles = require("./articles.json");
const chalk = require('chalk');

const index = {};
const doubles = {};

counter = 0;

// build index
data.forEach((item) => {
    if(!index[item.article]) index[item.article] = [{ _id: item._id, from: item.from, to: item.to }];
    else {
        index[item.article].push({ _id: item._id, from: item.from, to: item.to });
    }
});

const lookupArticles = (id) => {
    var a = articles.find(a => a._id === id);
    return a;
}

const checkOverlap = (key, array) => {
    for(var i=0; i < array.length - 1; i++) {
        for(var j=i+1; j < array.length; j++) {
            var res1 = array[i];
            var res2 = array[j];
            var range1 = moment.range(moment(res1.from), moment(res1.to));
            var range2 = moment.range(moment(res2.from), moment(res2.to));
            if(range1.overlaps(range2)) {
                console.log(chalk.green(lookupArticles(key).name));
                console.log(chalk.red(res1._id, res1.from, res1.to));
                console.log(chalk.red(res2._id, res1.from, res2.to));
                console.log(chalk.green("========================="));
            }
        }
    }
}

for(var key in index) {
    let values = index[key];
    if(values.length > 1) {
        // console.log(key);
        checkOverlap(key, values);
    }
}

console.log(counter);

