'use strict';

angular.module('core')
    .controller('ActuatorsController', ['$scope', 'actuatorsModel', 'actuatorsTypesModel', function ($scope, actuatorsModel, actuatorsTypesModel) {
        $scope.model = actuatorsModel.model;

        $scope.actuatorsTypesModel = actuatorsTypesModel.model;

        $scope.addEdit = function (controllerId) {
            actuatorsModel.addEdit(controllerId);
        };

        $scope.delete = function (controllerId) {
            actuatorsModel.delete(controllerId);
        };

        $scope.bulkDelete = actuatorsModel.bulkDelete;
        $scope.bulkDeleteDisabled = function () {
            return !actuatorsModel.model.actuators.some(function (controller) {
                return controller.isSelected;
            });
        };

        $scope.toggleElectricitySwitcher = function(controller){
            actuatorsModel.changeValue(controller);
        };

        $scope.onStopSlide = function($event, value, controller){
            actuatorsModel.changeValue(controller);
        };

        actuatorsModel.load();
    }]);
