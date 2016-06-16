'use strict';
const Resource = require('./../models/resource');

exports.getTypes = (req, res, next) => {
	Resource.find()
          .distinct('type', function(err, types) {
	           if(err) { return next(err); }
		         res.json(types);
	        });
};
