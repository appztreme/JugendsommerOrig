var app = angular.module('js');

app.value('toastrSvc', toastr);

app.factory('NotificationSvc', function(toastrSvc) {
    return {
        notify: function(msg) {
            toastrSvc.success(msg);
        },
        warn: function(msg) {
            toastrSvc.warning(msg);
        },
        inform: function(msg) {
            toastrSvc.info(msg);
        }
    };
});
