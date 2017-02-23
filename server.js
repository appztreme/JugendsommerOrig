var app = require('./app');
var config = require('./config');

app.listen(config.port, function() {
	console.log("Jugendsommer is listening on port " + config.port + " ...");
});
