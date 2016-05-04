'use strict';

angular.module('common')
    .factory('alertService', [function () {
        var model = {
            alerts: []
        };

        var showError = function (msg, dismissAfter) {
            model.alerts.push({type: 'danger', msg: msg, dismissOnTimeout: dismissAfter || 5000});
        };

        var showSuccess = function (msg, dismissAfter) {
            model.alerts.push({type: 'success', msg: msg, dismissOnTimeout: dismissAfter || 5000});
        };

        var closeAlert = function (index) {
            model.alerts.splice(index, 1);
        };

        return {
            model: model,
            showError: showError,
            showSuccess: showSuccess,
            closeAlert: closeAlert
        };
    }]);
