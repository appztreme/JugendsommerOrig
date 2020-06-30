const Article = require('./../server/models/article');
const mongoose = require('mongoose');
const chalk = require('chalk');




const main = async() => {
    let articles = await Article.find().exec();

    for(let i = 0; i < articles.length; i++) {
        let a = articles[i];
        //console.log(a);
        if(a.maxLoanDuration < 10) {
            a.maxLoanDuration = 10;
            try {
                await a.save();
                console.log(chalk.green("article ", a._id));
            } catch(err) {
                console.log(chalk.red("error article: ", err));
            }
        }
        
    }

    process.exit(1);
}

main();