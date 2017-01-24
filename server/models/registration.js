var db = require('../db');
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Activity = require('./activity');
var config = require('../../config');

var registrationSchema = db.Schema({
	firstNameParent: { type: String, required: true },
	lastNameParent: { type: String, required: true },
  	phoneNumberParent: { type: String, required: true },
  	emailParent: { type: String, required: true },
	firstNameChild: { type: String, required: true },
  	lastNameChild: { type: String, required: true },
	birthdayChild: { type: Date, required: true },
  	schoolChild: { type: String, required: true },
 	healthChild: { type: String, required: false },
	addressChild: { type: String, required: true, default: 'Adresse'},
	cityChild: { type: String, enum: config.cities, required: true, default: 'Jenesien' },
	bandName: { type: String, required: false },
	instrument: { type: String, required: false },
	instrumentYears: { type: String, required: false },
  	nameContact1: { type: String, required: false },
  	telContact1: { type: String, required: false },
  	nameContact2: { type: String, required: false },
  	telContact2: { type: String, required: false },
  	activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
  	prevActivityId: { type: mongoose.Schema.Types.ObjectId, ref: 'activity', required: false },
  	registrationDate: { type: Date, required: false, default: Date.now },
  	isPaymentDone: { type: Boolean, required: true, default: false },
  	isEmailNotified: { type: Boolean, required: true, default: false },
  	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
});

registrationSchema.plugin(deepPopulate, {});

registrationSchema.index({firstNameChild: 1, lastNameChild: 1, activityId: 1}, {unique: true});

registrationSchema.pre('save', function(next) {
  var reg = this;
  if(!reg.isNew) {
    Registration.findById(this._id, function(err, orig) {
      reg.prevActivityId = orig.activityId;
      next();
    });
  } else {
    next();
  }
});

registrationSchema.post('save', function(reg) {
  // console.log(reg.prevActivityId);
  // console.log(reg.activityId);
  if(!reg.activityId.equals(reg.prevActivityId)) {
    if(reg.prevActivityId != undefined)
    {
      Activity.findById(reg.prevActivityId, function(err, oldActivity) {
        oldActivity.curParticipants -= 1;
        oldActivity.save();
        Activity.findById(reg.activityId, function(err, activity) {
          activity.curParticipants += 1;
          activity.save();
        });
      });
    } else {
      Activity.findById(reg.activityId, function(err, activity) {
        activity.curParticipants += 1;
        activity.save();
      });
    }
  }
});

var Registration = db.model('Registration', registrationSchema);

module.exports = Registration;
