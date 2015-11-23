'use strict';

angular.module('core')
    .controller('SensorsController', ['$scope', 'sensorsModel', function ($scope, sensorsModel, pingService, $window) {
        $scope.model = sensorsModel.model;
        $scope.showPingResult = false;
        $scope.pingSuccess = false;

        $scope.addEdit = function (sensorId) {
            sensorsModel.addEdit(sensorId);
        };

        $scope.delete = function (sensorId) {
            sensorsModel.delete(sensorId);
        };

        $scope.ping = function () {
            pingService.ping(model.communicationPath).then(function (success) {
                $scope.pingSuccess = success;
                $scope.showPingResult = true;
                $window.$timeout(function () {
                    $scope.showPingResult = false;
                }, 3000);
            });
        };

        sensorsModel.load();
    }]);
