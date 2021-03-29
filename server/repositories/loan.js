'use strict';
const Loan = require('./../models/loan');
const Article = require('./../models/article');
const moment = require('moment');
// const { catch } = require('../db_shop');

exports.find = (from, to, articleId, location, lender) => {
    //console.log("params", from, to, articleId, location, lender);

    let query = Loan.find()
        .where('isInSet').equals(false);
    if(from && to) {
        let fromDate = new Date(from);
        fromDate.setHours(0,0,0);
        let toDate = new Date(to);
        toDate.setHours(23,59,59);
        query = query.where('from').gte(fromDate)
                     .where('to').lte(toDate);
    }
    else if(from) {
        let fromDate1 = new Date(from);
        fromDate1.setHours(0,0,0);
        let fromDate2 = new Date(from);
        fromDate2.setHours(23,59,59);
        query = query.where('from').gte(fromDate1)
                     .where('from').lte(fromDate2);
    }
    else if(to) {
        let toDate1 = new Date(to);
        toDate1.setHours(0,0,0);
        let toDate2 = new Date(to);
        toDate2.setHours(23,59,59);
        query = query.where('to').gte(toDate1)
                     .where('to').lte(toDate2);
    }
    if(articleId) query = query.where('article').equals(articleId);
    if(location) query = query.where('location').regex(new RegExp(location, 'i'));
    if(lender) query = query.where('lender').regex(new RegExp(lender, 'i'));
        
    return query
        .populate({path: 'article'})
        .sort({from: 1, 'article.code': 1, 'article.name': 1})
        .exec(); 
}

exports.findAllByDateRange = (from, to) => {
    return Loan.find()
        .where('from').gte(from)
        .where('to').lte(to)
        .where('isInSet').equals(false)
        .populate({path: 'article'})
        .sort({from: 1, 'article.code': 1, 'article.name': 1})
        .exec();
}

exports.findById = (id) => findLoanById(id);

const findLoanById = (id) => {
    return Loan.findById(id)
        .populate({path: 'article'})
        .exec();
}

const isFromGteNow = (from) => moment(from).isSameOrAfter(moment().startOf('day'));

const isFromLteTo = (from, to) => moment(from).isSameOrBefore(moment(to));

const isDurationValid = (from, to, duration) => Math.abs(moment(from).diff(moment(to), 'days')) <= duration;

const findReservableArticle = async (articles, from, to) => {
    let result = [];
    for(let i = 0; i < articles.length; i++) {
        const article = articles[i];
        const existingLoans = await Loan.find()
            .where('article').equals(article._id)
            .where('from').lte(to)
            .where('to').gte(from)
            .exec();
        if(existingLoans.length === 0) return article._id;
    }
    return null;
}

exports.create = async (articleName, location, lender, phoneNumber, from, to, start, destination, startTime, endTime, participants) => {
    //console.log(articleName, from, to, start, destination, startTime, endTime, participants);
    // console.log("from", moment(from).isSameOrAfter(moment("2018-03-04")));
    if(!isFromGteNow(from))
        throw new Error(`Es kann nicht in die Vergangenheit gebucht werden. Anfangsdatum: ${moment(from).format('YYYY-MM-DD')}`);
    if(!isFromLteTo(from,to))
        throw new Error('Das Anfangsdatum muß kleiner/gleich den Enddatum sein.');
    const articlesToReserve = await Article
        .find({name: articleName})
        //.where('isInSet').equals(false)
        .where('status').ne('blocked')
        .sort({code: 1})
        .exec();
    if(articlesToReserve.length < 1)
        throw new Error('Es konnten keine Artikel gefunden werden');
    if(!isDurationValid(from, to, articlesToReserve[0].maxLoanDuration))
        throw new Error(`Der Artikel kann nicht länger als ${articlesToReserve[0].maxLoanDuration} Tage reserviert werden.`);

    const reservableArticleId = await findReservableArticle(articlesToReserve, from, to);
    if(reservableArticleId !== null) {
        const l = new Loan({
            location,
            lender,
            phoneNumberLender: phoneNumber,
            from,
            to,
            article: reservableArticleId,
            start,
            destination,
            startTime,
            endTime,
            participants
        });
        console.log("new loan", l);
        const newLoan = await l.save();
        return findLoanById(newLoan._id);
    }
    else {
        throw new Error(`Artikel dieses Typs sind in den Zeitraum von ${moment(from).format('YYYY-MM-DD')} bis ${moment(to).format('YYYY-MM-DD')} nicht verfügbar`);
    }
}

exports.createById = async (articleId, lender, phoneNumber, from, to, maxDuration) => {
    console.log(articleId, from, to, lender, phoneNumber, maxDuration);
    // console.log("from", moment(from).isSameOrAfter(moment("2018-03-04")));
    if(!isFromGteNow(from))
        throw new Error(`Es kann nicht in die Vergangenheit gebucht werden. Anfangsdatum: ${moment(from).format('YYYY-MM-DD')}`);
    if(!isFromLteTo(from,to))
        throw new Error('Das Anfangsdatum muß kleiner/gleich den Enddatum sein.');
    if(!isDurationValid(from, to, maxDuration))
        throw new Error(`Der Artikel kann nicht länger als ${maxDuration} Tage reserviert werden.`);

    const l = new Loan({
            location: '-',
            lender,
            phoneNumberLender: phoneNumber,
            from,
            to,
            article: articleId
        });
    try {
        const newLoan = await l.save();
        return findLoanById(newLoan._id);
    } catch(errSave) {
        console.log(errSave);
        throw errSave;
    }
}

exports.delete = (id) => {
    return Loan.findByIdAndRemove(id);
}