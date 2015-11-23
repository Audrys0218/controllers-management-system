'use strict';

angular.module('core')
    .controller('ControllersController', ['$scope', 'controllersModel', 'controllersTypesModel', function ($scope, controllersModel, controllersTypesModel) {
    $scope.model = controllersModel.model;

    $scope.controllersTypesModel = controllersTypesModel.model;

    $scope.addEdit = function(controllerId){
        controllersModel.addEdit(controllerId);
    };

    $scope.delete = function(controllerId){
        controllersModel.delete(controllerId);
    };

    controllersModel.load();
}]);
