var db = require('../db');

var agbSchema = db.Schema({
	text: { type: String, required: true },
});

var Agb = db.model('Agb', agbSchema);

module.exports = Agb;
