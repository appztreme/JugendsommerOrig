'use strict';
const Loan = require('./../models/loan');
const Article = require('./../models/article');
const moment = require('moment');

exports.find = (from, to, articleId, location, lender) => {
    console.log("params", from, to, articleId, location, lender);

    let query = Loan.find()
        .where('from').gte(from)
        .where('to').lte(to)
        .where('isInSet').equals(false);
    
    if(articleId) query = query.where('articleId').equals(articleId);
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

exports.delete = (id) => {
    return Loan.findByIdAndRemove(id);
}