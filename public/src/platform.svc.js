var app = angular.module('js');

app.factory('PlatformSvc', function(conf) {

	return {
                host: undefined,

                isKiso: function() { return !!this.host && this.host.indexOf('kiso') !== -1; },

                isJugendsommer: function() { return !!this.host && this.host.indexOf('jugendsommer') !== -1; },

                isJDBL: function() { return !!this.host && this.host.indexOf('jd-bozenland') !== -1; },

                isJDUL: function() { return !!this.host && this.host.indexOf('jdsummer') !== -1; },
                
                isJSGries: function() { return !!this.host && this.host.indexOf('jungschargries') !== -1; },

                isJDWT: function() { return !! this.host && this.host.indexOf('wipptal') !== -1; },

                isTest: function() { return !!this.host && this.host.indexOf('localhost') !== -1; },

                getTitle: function() {
                        if(this.isKiso()) return 'Kindersommer';
                        else if(this.isJugendsommer()) return 'Jugendsommer';
                        else if(this.isJDBL()) return 'Jugenddienst Bozen Land';
                        else if(this.isJDUL()) return 'Jugenddienst Unterland';
                        else if(this.isJDWT()) return 'Jugenddienst Wipptal';
                        else if(this.isJSGries()) return 'Jungschar Gries';
                        else if(this.isTest()) return 'Test';
                        else return 'Title';
                },

                getCities: function() {
                        if(this.isKiso()) return conf.cities_kiso;
                        else if(this.isJugendsommer()) return conf.cities_jdbl;
                        else if(this.isJDBL()) return conf.cities_jdbl;
                        else if(this.isJDUL()) return conf.cities_jdul;
                        else if(this.isJSGries()) return conf.cities_kiso;
                        else return ['test', 'Andere'];
                },

                getDefaultCity: function() {
                        if(this.isKiso()) return 'Bozen';
                        else if(this.isJugendsommer()) return 'Deutschnofen';
                        else if(this.isJDBL()) return 'Deutschnofen';
                        else if(this.isJDUL()) return '';
                        else if(this.isJSGries()) return 'Bozen';
                        else return 'Andere';
                }
	};
});
