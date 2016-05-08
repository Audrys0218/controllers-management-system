'use strict';

angular.module('core')
    .controller('ActuatorsController', function($scope, actuatorsModel, actuatorsTypesModel, confirmation) {
        $scope.actuatorsModel = actuatorsModel.model;

        $scope.actuatorsTypesModel = actuatorsTypesModel.model;

        $scope.addEdit = function(controllerId) {
            actuatorsModel.addEdit(controllerId);
        };

        $scope.delete = function(controllerId) {
            confirmation.confirm('Warning!', 'Do you really want to delete this item?', function() {
                actuatorsModel.delete(controllerId);
            });
        };

        $scope.bulkDelete = function() {
            confirmation.confirm('Warning!', 'Do you really want to delete these items?', function() {
                actuatorsModel.bulkDelete();
            });
        };

        $scope.bulkDeleteDisabled = actuatorsModel.bulkDeleteDisabled;

        $scope.toggleElectricitySwitcher = function(actuator) {
            actuatorsModel.changeValue(actuator);
        };

        $scope.onStopSlide = function($event, value, controller) {
            actuatorsModel.changeValue(controller);
        };

        $scope.load = actuatorsModel.load;
    });
