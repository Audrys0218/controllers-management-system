'use strict';

angular.module('core')
    .controller('ControllersController', ['$scope', 'controllersModel', 'controllersTypesModel', function ($scope, controllersModel, controllersTypesModel) {
        $scope.model = controllersModel.model;

        $scope.controllersTypesModel = controllersTypesModel.model;

        $scope.addEdit = function (controllerId) {
            controllersModel.addEdit(controllerId);
        };

        $scope.delete = function (controllerId) {
            controllersModel.delete(controllerId);
        };

        $scope.bulkDelete = controllersModel.bulkDelete;
        $scope.bulkDeleteDisabled = function () {
            return !controllersModel.model.controllers.some(function (controller) {
                return controller.isSelected;
            });
        };
        controllersModel.load();
    }]);
