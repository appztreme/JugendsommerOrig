'use strict';
const auth = require('./authentication');
const router = require('express').Router();
const ArticleController = require('./../controller/articleCtrl');

router.get('/', ArticleController.find);

router.get('/type/:type', ArticleController.findByType);

router.get('/overview', ArticleController.findOverview);

router.get('/:id', ArticleController.findById);

router.post('/', auth.requiresRole("admin"), ArticleController.create);

router.put('/', auth.requiresRole("admin"), ArticleController.update);

router.delete('/:id', auth.requiresRole("admin"), ArticleController.remove)

router.patch('/status', ArticleController.updateStatus);

router.patch('isInSet', auth.requiresRole("admin"), ArticleController.updateIsInSet);

module.exports = router;