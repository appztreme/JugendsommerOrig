exports.config = {
	framework: 'mocha',
	allScriptsTimeout: 50000,
	specs: [ 'test/e2e/*.spec.js' ],
	mochaOpts: { enableTimeouts: false},
	onPrepare: function() {
		process.env.PORT = 82;
		require('./app');
	}
}
