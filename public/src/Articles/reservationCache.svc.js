var app = angular.module('js');

app.service('ReservationCacheSvc', function() {
    this.location = undefined;
    this.lender = undefined;
    this.phoneNumber = undefined;
    this.from = undefined;
    this.to = undefined;

    this.hasData = function() {
        return this.location &&
        this.lender &&
        this.phoneNumber &&
        this.from &&
        this.to;
    }
});