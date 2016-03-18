var db = require('../db');

var eventSchema = db.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	type: { type: String, enum: ['summer', 'music'], required: true, default: 'summer'},
	location: { type: String, enum: ['Deutschnofen', 'Jenesien', 'Karneid', 'Mölten', 'Ritten', 'Tiers', 'Welschnofen', 'Hüttenlagerwoche', 'Tschögglberger Jungbläserwoche'], required: true, default: 'Jenesien' },
	//location: { type: String },
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true },
	visibleFrom: { type: Date, required: false, default: Date.now },
	visibleTo: { type: Date, required: false, default: Date.now },
  info: { type: String, required: true }
});

var Event = db.model('Event', eventSchema);

module.exports = Event;
