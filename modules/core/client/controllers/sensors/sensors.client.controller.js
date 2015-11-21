'use strict';

angular.module('core')
    .controller('SensorsController', ['$scope', '$http', '$modal', '$log', 'confirmation', function ($scope, $http, $modal, $log, confirmation) {
    $scope.sensors = [];



    $scope.delete = function(sensor, index) {
        confirmation.confirm('Warning!', 'Do you really want to delete this item?', function() {
            $http({
                method: 'DELETE',
                url: '/api/sensors/' + sensor._id
            }).then(function() {
                $scope.sensors.splice(index, 1);
            }, errorCallback);
        });
    };

    $http({
        method: 'GET',
        url: '/api/v1/sensors'
    }).then(successCallback, errorCallback);

    function successCallback(response) {
        console.log(response);
        if(response.data.success){
            $scope.sensors = response.data.data;
        }else{
            console.log('Error:' + response.data.message);
        }
    }

    function errorCallback() {
        console.log('Internal server error');
    }

}]);
