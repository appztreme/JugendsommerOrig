var db = require('../db');

var resourceSchema = db.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	type: { type: String, required: true }
});

var Resource = db.model('Resource', resourceSchema);

module.exports = Resource;
