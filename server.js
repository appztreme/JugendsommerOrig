var app = require('./app');

var port = process.env.PORT || 81;
app.listen(port, function() {
	console.log("Jugendsommer is listening on port " + port + " ...");
});
