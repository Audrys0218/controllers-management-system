'use strict';

angular.module('common')
    .directive('alerts', function () {
        return {
            restrict: 'A',
            templateUrl: 'modules/core/client/common/directives/alerts.html',
            controller: function ($scope, alertService) {
                $scope.alertsModel = alertService.model;

                $scope.closeAlert = alertService.closeAlert;
            }
        };
    });
