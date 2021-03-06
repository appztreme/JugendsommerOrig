var db = require('../db');
var mongoose = require('mongoose');
var Activity = require('./activity');
var config = require('../../config');

const  tSizes = config.tSizes.map(function(s){ return s.name});
//const locs = config.validLocations.map(function(l){return l.name});

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
	addressChild: { type: String, required: false, default: 'Adresse'},
  //cityChild: { type: String, enum: config.cities, required: true, default: 'Jenesien' },
  cityChild: { type: String, required: true, default: 'Jenesien' },
  tShirtSize: { type: String, required: false },
  hasOwnEBike: { type: Boolean, require: true, default: false },
  heightChild: { type: Number, required: false },
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
  needsPreCare: { type: Boolean, required: true, default: false },
  hasHealthIssues: { type: Boolean, required: true, default: false },
  healthIncompatibility: { type: String, required: false },
  healthAllergy: { type: String, required: false },
  healthIllnes: { type: String, required: false },
  hasDisability: { type: Boolean, required: true, default: false },
  diagnosticDescription: { type: String, required: false },
  disabilityDescription: { type: String, required: false },
  needsEbK: { type: Boolean, required: true, default: false },
  canSwim: { type: Boolean, required: true, default: false },
  canGoHomeAllone: { type: Boolean, required: true, default: false },
  receiptNumber: { type: Number, required: false },
  commentInternal: { type: String, required: false },
  isSiblingReservation: { type: Boolean, required: true, default: false },
  acceptsOptionalFee: { type: Boolean, required: true, default: false },
  asksForReduction: { type: Boolean, required: true, default: false },
  acceptsNewsletter: { type: Boolean, required: true, default: false },
  acceptsMediaPublication: { type: Boolean, required: true, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  isPrioUp: { type: Boolean, required: true, default: false },
  isPrioDown: { type: Boolean, required: true, default: false },
  isRefunded: { type: Boolean, required: true, default: false },
  preferredFellow: { type: String, required: false },
  covidRules: {
    isAtRisk : { type: Boolean, required: true, default: false },
    isPrioWork: { type: Boolean, required: true, default: false },
    isPrioSocial: { type: Boolean, required: true, default: false },
    isPrioNone: { type: Boolean, required: true, default: false }
  },
  transferStatus: {
    move: { type: Boolean, required: true, default: false },
    unavailable: { type: Boolean, required: true, default: false },
    waitlist: { type: Boolean, required: true, default: false }
  },
  taxNumber: { type: String, required: false },
  gender: { type: String, enum: ['male', 'female'], required: true, default: 'female' },
  wasWaiting: { type: Boolean, required: true, default: false },
});

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
