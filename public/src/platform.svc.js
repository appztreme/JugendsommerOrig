var app = angular.module('js');

app.factory('PlatformSvc', function() {

	return {
                host: undefined,

                isKiso: function() { return !!this.host && this.host.indexOf('kiso') !== -1; },

                isJugendsommer: function() { return !!this.host && this.host.indexOf('jugendsommer') !== -1; },

                isJDBL: function() { return !!this.host && this.host.indexOf('jd-bozenland') !== -1; },

                isJDUL: function() { return !!this.host && this.host.indexOf('jdsummer') !== -1; },

                isJDWT: function() { return !! this.host && this.host.indexOf('wipptal') !== -1; },

                isTest: function() { return !!this.host && this.host.indexOf('localhost') !== -1; },

                getTitle: function() {
                        if(this.isKiso()) return 'Kindersommer';
                        else if(this.isJugendsommer()) return 'Jugendsommer';
                        else if(this.isJDBL()) return 'Jugenddienst Bozen Land';
                        else if(this.isJDUL()) return 'Jugenddienst Unterland';
                        else if(this.isJDWT()) return 'Jugenddienst Wipptal';
                        else if(this.isTest()) return 'Test';
                        else return 'Title';
                }
	};
});
