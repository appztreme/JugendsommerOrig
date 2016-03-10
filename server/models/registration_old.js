var db = require('../db');
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');
var Activity = require('./activity');

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
  nameContact1: { type: String, required: false },  
  telContact1: { type: String, required: false },
  nameContact2: { type: String, required: false },
  telContact2: { type: String, required: false },
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
  registrationDate: { type: Date, required: false, default: Date.now },
  isPaymentDone: { type: Boolean, required: true, default: false },
  isEmailNotified: { type: Boolean, required: true, default: false }
});

registrationSchema.plugin(deepPopulate, {});

registrationSchema.pre('save', function(next) {
  if(!this.isNew) {
    Registration.findById(this._id, function(err, orig) {
      Activity.findById(orig.activityId, function(err, activity) {
        activity.curParticipants -= 1;
        activity.save();
      });
    });
  }
  next();
});

registrationSchema.post('save', function(reg) {
    Activity.findById(reg.activityId, function(err, activity) {
        activity.curParticipants += 1;
        activity.save();
    });
});

var Registration = db.model('Registration', registrationSchema);

module.exports = Registration;
