'use strict';

angular.module('core')
    .controller('SensorsController', function ($scope, sensorsTypesModel, sensorsModel, pingService, $window) {
        $scope.model = sensorsModel.model;
        $scope.showPingResult = false;
        $scope.pingSuccess = false;

        $scope.sensorTypesModel = sensorsTypesModel.model;

        $scope.addEdit = function (sensorId) {
            sensorsModel.addEdit(sensorId);
        };

        $scope.delete = function (sensorId) {
            sensorsModel.delete(sensorId);
        };

        $scope.ping = function () {
            pingService.ping($scope.model.communicationPath).then(function (success) {
                $scope.pingSuccess = success;
                $scope.showPingResult = true;
                $window.$timeout(function () {
                    $scope.showPingResult = false;
                }, 3000);
            });
        };

        $scope.bulkDelete = sensorsModel.bulkDelete;
        $scope.bulkDeleteDisabled = function () {
            return !sensorsModel.model.sensors.some(function (sensor) {
                return sensor.isSelected;
            });
        };

        sensorsModel.load();
    });
