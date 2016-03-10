		var mongoose = require('mongoose');

exports.clearDB = function(done) {
   for (var i in mongoose.connection.collections) {
     mongoose.connection.collections[i].remove(function() {});
   }
   return done();
 }

exports.compareModels = function(model1, model2) {
	for(var prop in model1.schema.paths) {
		if(prop[0] === '_') continue;
		if(model1[prop] instanceof Date) {
			if(new Date(model1[prop]).getTime() !== new Date(model2[prop]).getTime()) { console.log(prop); return false; }
		}
		else if(model1[prop] instanceof String) {
			if(!model1[prop].equals(model2[prop])) { return false; }
		}
		else if(model1[prop] instanceof Object) {
			if(!model1[prop].equals(model2[prop])) { return false; }
		}
		else {
			if(model1[prop] != model2[prop]) {
				console.log(prop);
				return false;
			}
		}
	}
	return true;
}
