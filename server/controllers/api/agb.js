var Agb = require('../../models/agb');
var router = require('express').Router();

router.get('/', function(req, res, next) {
	Agb.find()
	     	.exec(function(err, agb) {
			if(err) { return next(err); }
			res.json(agb);
	});
});

router.put('/', function(req, res, next) {

	Agb.findById(req.body._id, function(err, agb) {
		if(!agb) return next(new Error('Kein Agb im System mit id ' + req.body._id));
		agb.text = req.body.text;

		agb.save(function(err) {
			if(err) next(err);
			res.json(201, agb);
		});
	});
});

module.exports = router;
