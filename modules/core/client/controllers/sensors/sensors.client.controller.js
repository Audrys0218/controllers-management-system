'use strict';

angular.module('core')
    .controller('SensorsController', ['$scope', 'sensorsModel', function ($scope, sensorsModel) {
        $scope.model = sensorsModel.model;

        $scope.addEdit = function (sensorId) {
            sensorsModel.addEdit(sensorId);
        };

        $scope.delete = function (sensorId) {
            sensorsModel.delete(sensorId);
        };

        sensorsModel.load();
    }]);
