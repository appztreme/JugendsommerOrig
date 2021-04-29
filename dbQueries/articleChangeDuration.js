const Article = require('./../server/models/article');
const chalk = require('chalk');
const mongoose = require('mongoose');
const moment = require('moment');

const main = async() => {
    const articles = await Article.find().exec();
    
    for(let i = 0; i < articles.length; i++) {
        let a = articles[i];
        a.maxLoanDuration = 30;
        await a.save();
        console.log(chalk.blue(a.maxLoanDuration));
    }
    console.log(chalk.green("Done"));

    process.exit(1);
}

main();