'use strict';
const { aggregate } = require('./../models/article');
const Article = require('./../models/article');
const Loan = require('./../models/loan');

const curYear = (new Date().getMonth() >= 10) ? new Date().getFullYear()+1 : new Date().getFullYear();
const startCurYear = new Date(curYear+"-1-1");

exports.count = () => {
    return Article.count({});
}

exports.findAll = async () => {
    let result = [];
    let articles = await Article.find({}).sort({type: 1, name: 1}).exec();
    for (var i = 0; i < articles.length; i++) {
        let loans = await Loan.find({ article: articles[i]._id, to: { $gte: startCurYear }}, { from: 1, to: 1}).exec();
        let r = articles[i].toJSON();
        r.loans = loans;
        result.push(r);
    }
    return result;
    // return Article
    //     //.find({})
    //     .aggregate([
    //         { $lookup: {
    //                 from: "loans",
    //                 localField: "_id",
    //                 foreignField: "article",
    //                 as: "loans"
    //             }
    //          },
    //          { $sort: {
    //             type: 1, name: 1, code: 1
    //          }}
    //     ])
    //     //.sort({type: 1, name: 1, code: 1})
    //     .exec();
}

exports.findById = (id) => {
    return Article.findById(id).exec();
}

exports.findByType = (type) => {
    return Article.find().where('type').equals(type).exec();
}

exports.findOverview = (search) => {
    console.log("search", search);
    if(search !== 'null') {
        return Article.aggregate([
            {
                $match: {
                    $or: [
                        {code: {'$regex': search }},
                        {name: {'$regex': search }}
                    ]
                }
            },
            { $sort: { 'name': 1 }},
            { $group:
                { _id: "$type",
                  count: { $sum: 1 },
                  children: { $push: { _id: "$_id", code: "$code", name: "$name", description: "$description", location: "$location", status: "$status", isInSet: "$isInSet" }}
                }
            },
            { $sort: { 'children.name': 1 }}
        ]).exec();
    } else {
    return Article.aggregate([
        { $sort: { 'name': 1 }},
        { $group:
            { _id: "$type",
              count: { $sum: 1 },
              children: { $push: { _id: "$_id", code: "$code", name: "$name", description: "$description", location: "$location", status: "$status", isInSet: "$isInSet" }}
            }
        },
        { $sort: { 'children.name': 1 }}
    ]).exec();
    }
}

exports.update = (article) => {
    return Article.findByIdAndUpdate(article._id, article, {new: true});
}

exports.updateStatus = (id, newStatus) => {
    return Article.findByIdAndUpdate(id, {status: newStatus}, {new: true});
}

exports.updateIsInSet = (id, isInSet) => {
    let status = isInSet ? 'blocked' : 'free';
    return Article.findByIdAndUpdate(id, {isInSet: isInSet, status: status}, {new: true});
}

exports.create = (name, description, location, type, maxLoanDuration, isSet, articles) => {
    const a = new Article({
        name,
        description,
        location,
        type,
        maxLoanDuration,
        isSet,
        articles
    });
    return a.save();
}

exports.delete = (id) => {
    return Article.findByIdAndRemove(id);
}