'use strict';

module.exports = {
	compare
}

function compareOnYear(date1, date2)
{
	return date1
}


function compareIfAlreadyExists(date) {
  var now = new Date();

  return date.getFullYear() <= now.getFullYear() &&
         date.getMonth() <= now.getMonth() &&
         date.getDay() <= now.getDay() &&
         date.getHours() <= now.getHours() &&
         date.getMinutes() <= now.getMinutes() &&
         date.getSeconds() <= now.getSecondes()
}

module.exports = ;