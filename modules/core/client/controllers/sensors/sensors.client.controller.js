'use strict';

angular.module('core').controller('SensorsController', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal, $log) {
    $scope.sensors = [];

    $scope.add = function(){
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modules/core/client/views/sensors/sensors.add.client.view.html',
            size: 'lg',
            scope: $scope
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.edit = function(sensor){
        $scope.editModel = sensor;
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modules/core/client/views/sensors/sensors.edit.client.view.html',
            size: 'lg',
            scope: $scope
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.delete = function(sensor, index) {
        $http({
            method: 'DELETE',
            url: '/api/sensors/' + sensor._id
        }).then(function() {
            $scope.sensors.splice(index, 1);
        }, errorCallback);
    };

    $http({
        method: 'GET',
        url: '/api/sensors'
    }).then(successCallback, errorCallback);

    function successCallback(response) {
        console.log(response);
        if(response.data.success){
            $scope.sensors = response.data.data;
        }else{
            console.log('Error:' + response.data.message);
        }
    }

    function errorCallback(response) {
        console.log('Internal server error');
    }

}]);
