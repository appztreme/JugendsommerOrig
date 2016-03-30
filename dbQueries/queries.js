// count of this years registrations
db.registrations.find({registrationDate: {$gte: new Date(2016,1,1)}}).count();

// find userName doubles via map / reduce
var map = function() {
  if(this.userName) {
      emit(this.userName, 1);
  }
}

var reduce = function(key, values) {
  return Array.sum(values);
}

var res = db.users.mapReduce(map, reduce, { out: { inline : 1 }});
db[res.result].find({ value: {$gt: 1}}).sort({ value: -1 });
