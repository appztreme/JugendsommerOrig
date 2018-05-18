var app = angular.module('js');

app.service('CalendarCacheSvc', function() {
    this.location = undefined;
    this.lender = undefined;
    this.articleId = undefined;
    this.from = undefined;
    this.to = undefined;

    this.hasData = function() {
        return this.location ||
        this.lender ||
        this.articleId ||
        this.from ||
        this.to;
    }
});