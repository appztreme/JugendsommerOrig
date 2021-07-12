const Loan = require('./../../server/models/loan');
const mongoose = require('mongoose');
const chalk = require('chalk');

const loanId = "";
const newArticleId = "";


const main = async() => {
    let loan = await Loan.findById(mongoose.Types.ObjectId(loanId));
    loan.article = mongoose.Types.ObjectId(newArticleId);
    await loan.save();

    console.log(chalk.green("Done"));

    process.exit(1);
}
