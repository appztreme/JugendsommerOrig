'use strict';
const Article = require('./../models/article');

exports.count = () => {
    return Article.count({});
}

exports.findAll = () => {
    return Article
        .find({})
        .sort({type: 1, name: 1, code: 1})
        .exec();
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
            { $group:
                { _id: "$type",
                  count: { $sum: 1 },
                  children: { $push: { _id: "$_id", code: "$code", name: "$name", description: "$description", location: "$location", status: "$status", isInSet: "$isInSet" }}
                }
            },
            { $sort: {_id: 1, 'children.name': 1 }}
        ]).exec();
    } else {
    return Article.aggregate([
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