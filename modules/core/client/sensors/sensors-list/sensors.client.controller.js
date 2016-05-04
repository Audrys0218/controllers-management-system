'use strict';

angular.module('core')
    .controller('SensorsController', function($scope, sensorsTypesModel, sensorsModel, confirmation) {
        $scope.sensorsModel = sensorsModel.model;
        $scope.sensorTypesModel = sensorsTypesModel.model;

        $scope.addEdit = sensorsModel.addEdit;

        $scope.delete = function(sensorId) {
            confirmation.confirm('Warning!', 'Do you really want to delete this item?', function() {
                sensorsModel.delete(sensorId);
            });
        };

        $scope.bulkDelete = function(){
            confirmation.confirm('Warning!', 'Do you really want to delete these items?', function() {
                sensorsModel.bulkDelete();
            });
        };
        $scope.bulkDeleteDisabled = sensorsModel.bulkDeleteDisabled;

        $scope.load = function() {
            sensorsModel.load().then(function() {
                sensorsModel.startUpdatingSensorsValues();
            });
        };

        $scope.$on('$destroy', function() {
            sensorsModel.stopUpdatingSensorsValues();
        });
    });
