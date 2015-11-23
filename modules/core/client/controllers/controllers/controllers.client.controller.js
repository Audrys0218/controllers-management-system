'use strict';

angular.module('core')
    .controller('ControllersController', ['$scope', 'controllersModel', function ($scope, controllersModel) {
    $scope.model = controllersModel.model;

    $scope.addEdit = function(controllerId){
        controllersModel.addEdit(controllerId);
    };

    $scope.delete = function(controllerId){
        controllersModel.delete(controllerId);
    };

    controllersModel.load();
}]);
