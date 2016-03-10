var expect = require('chai').expect;

this.waitUntilReady = function (elm) {
        browser.wait(function () {
            return elm.isPresent();
        },10000);
        browser.wait(function () {
            return elm.isDisplayed();
        },10000);
    };

describe('open app and create new user', function() {
	it('open and see events', function() {
		browser.get('http://localhost:82');
		element(by.id('login_newUser')).click();
		element(by.name('firstName')).sendKeys('Florian');
		element(by.name('lastName')).sendKeys('Edelmaier');
		element(by.name('userTel')).sendKeys('9876');
		element(by.name('userName')).sendKeys('floUN');
		element(by.name('pwd')).sendKeys('oflPWD');
		element(by.id('newUser_submit')).click();
		element(by.id('login_user')).sendKeys('floUN');
		element(by.id('login_pwd')).sendKeys('oflPWD');
		element(by.id('login_newUser')).click();
		waitUntilReady(element(by.id('login_curUser')));
		var loginUser = element(by.id('login_curUser')).getAttribute('innerHTML').then(function(text) {
			console.log(text);
			expect(text).to.equal('Florian Edelmaier');	
		});
	});
});
