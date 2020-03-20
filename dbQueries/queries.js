  // count of this years registrations
db.registrations.find({registrationDate: {$gte: new Date(2020,3,19)}}).count();

// find userName doubles via map / reduce
var map = function() {
  if(this.userName) {
      emit(this.userName, 1);
  }
}

var reduce = function(key, values) {
  return Array.sum(values);
}

var res = db.users.mapReduce(map, reduce, { out: "user_result"});

db.user_result.remove({});

db[res.result].find({ value: {$gt: 1}}).sort({ value: -1 });
