'use strict';

angular.module('core')
    .controller('SensorsController', function($scope, sensorsTypesModel, sensorsModel) {
        $scope.sensorsModel = sensorsModel.model;
        $scope.sensorTypesModel = sensorsTypesModel.model;

        $scope.bybis = 'bybs';

        $scope.addEdit = function(sensorId) {
            sensorsModel.addEdit(sensorId);
        };

        $scope.delete = function(sensorId) {
            sensorsModel.delete(sensorId);
        };

        $scope.bulkDelete = sensorsModel.bulkDelete;
        $scope.bulkDeleteDisabled = function() {
            return !sensorsModel.model.sensors.some(function(sensor) {
                return sensor.isSelected;
            });
        };

        sensorsModel.load().then(function() {
            sensorsModel.startUpdatingSensorsValues();
        });

        $scope.$on('$destroy', function() {
            sensorsModel.stopUpdatingSensorsValues();
        });
    });
