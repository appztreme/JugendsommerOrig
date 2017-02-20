var db = require('../db');
var config = require('../../config');

var locs = config.validLocations.map(function(l){ return l.name});

var eventSchema = db.Schema({
	name: { type: String, required: true },
	name_it: { type: String, required: false },
	description: { type: String, required: true },
	description_it: { type: String, required: false },
	type: { type: String, enum: ['summer', 'music', 'spiritnight', 'club'], required: true, default: 'summer'},
	location: { type: String, enum: locs, required: true, default: 'Jenesien' },
	location_it: { type: String, required: false},
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	visibleFrom: { type: Date, required: false, default: Date.now },
	visibleTo: { type: Date, required: false, default: Date.now },
	budgetBusiness: { type: Number, required: true, default: 0 },
	budgetFood: { type: Number, required: true, default: 0 },
  	info: { type: String, required: true },
	info_it: { type: String, required: true },
	isInternal: { type: Boolean, required: true, default: false },
});

var Event = db.model('Event', eventSchema);

module.exports = Event;
