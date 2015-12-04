'use strict';

angular.module('core').controller('DashboardController', ['$scope', 'sensorsModel', 'controllersModel', 'sensorsTypesModel', 'controllersTypesModel', '$interval',
    function ($scope, sensorsModel, controllersModel, sensorsTypesModel, controllersTypesModel, $interval) {
    
    $scope.sensorsModel = sensorsModel.model;
    $scope.sensorsTypesModel = sensorsTypesModel.model;

    $scope.controllersModel = controllersModel.model;
    $scope.controllersTypesModel = controllersTypesModel.model;

    function load(){
        sensorsModel.load();
        controllersModel.load();
    }

    load();

    var interval = $interval(load, 3000);

    $scope.$on('$destroy',function(){
        if(interval)
            $interval.cancel(interval);
    });
}]);
