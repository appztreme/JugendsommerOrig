var app = require('./app');
var config = require('./config');
var args = require('args');

args.option('port', 'The port on which the app will be running', config.port);
var flags = args.parse(process.argv)

app.listen(flags.port, function() {
	console.log("Jugendsommer is listening on port " + flags.port + " ...");
});
