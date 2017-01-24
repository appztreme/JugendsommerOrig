'use strict';
const router = require('express').Router();
const config = require('./../../config');
router.get('/events', (req, res, next) => {
    res.json(config.validLocations);
})
router.get('/cities', (req, res, next) => {
    res.json(config.cities);
});


module.exports = router;
