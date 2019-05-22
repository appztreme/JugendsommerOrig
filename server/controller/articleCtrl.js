'use strict';
const ArticleRepo = require('./../repositories/article');

exports.find = async (req, res, next) => {
    try {
        const articles = await ArticleRepo.findAll();
        res.status(200).json(articles);
    } catch(err) {
        next(err);
    }
}

exports.findByType = async (req, res, next) => {
    try {
        const articles = await ArticleRepo.findByType(req.params.type);
        res.status(200).json(articles);
    } catch(err) {
        next(err);
    }
}

exports.findOverview = async(req, res, next) => {
    try {
        const overview = await ArticleRepo.findOverview(req.params.search);
        res.status(200).json(overview);
    } catch(err) {
        next(err);
    }
}

exports.findById = async (req, res, next) => {
    try {
        const article = await ArticleRepo.findById(req.params.id);
        res.status(200).json(article);
    } catch(err) {
        next(err);
    }
}

exports.create = async (req, res, next) => {
    try {
        const article = await ArticleRepo.create(req.body.name, req.body.description, req.body.location, req.body.type, req.body.maxLoanDuration, req.body.isSet, req.body.articles);
        res.status(201).json(article);
    } catch(err) {
        next(err);
    }
}

exports.update = async (req, res, next) => {
    try {
        //const article = await ArticleRepo.update(req.body);
        const article = await ArticleRepo.findById(req.body._id);
        article.name = req.body.name;
        article.description = req.body.description;
        article.location = req.body.location;
        article.maxLoanDuration = req.body.maxLoanDuration;
        article.isSet = req.body.isSet;
        article.isInSet = req.body.isInSet;
        article.articles = req.body.articles;
        await article.save();
        res.status(200).json(article);
    } catch(err) {
        next(err);
    }
}

exports.remove = async (req, res, next) => {
    try {
        const article = await ArticleRepo.delete(req.params.id);
        res.status(200).json(article);
    } catch(err) {
        next(err);
    }
}

exports.updateStatus = async (req, res, next) => {
    try {
        const article = await ArticleRepo.updateStatus(req.body.id, req.body.newStatus);
        res.status(200).json(article);
    } catch(err) {
        next(err);
    }
}

exports.updateIsInSet = async (req, res, next) => {
    try {
        const article = await ArticleRepo.updateIsInSet(req.body.id, req.body.isInSet);
        res.status(200).json(article);
    } catch(err) {
        next(err);
    }
}