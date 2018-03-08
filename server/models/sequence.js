var db = require('../db');
var mongoose = require('mongoose');

var sequenceSchema = db.Schema({
  _id: { type: String },
  seq: { type: Number, required: true, default: 0 }
});

sequenceSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

var Sequence = db.model('Sequence', sequenceSchema);

module.exports = Sequence;