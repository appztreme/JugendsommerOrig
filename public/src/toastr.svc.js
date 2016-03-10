var app = angular.module('js');

app.value('toastrSvc', toastr);

app.factory('NotificationSvc', function(toastrSvc) {
    return {
        notify: function(msg) {
            toastrSvc.success(msg);
            console.log(msg);
        },
        warn: function(msg) {
            toastrSvc.warning(msg);
            console.log(msg);
        },
        inform: function(msg) {
            toastrSvc.info(msg);
            console.log(msg);
        }
    };
});
