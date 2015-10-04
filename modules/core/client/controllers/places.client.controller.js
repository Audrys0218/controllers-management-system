'use strict';

angular.module('core').controller('PlacesController', ['$scope', '$http', function ($scope, $http) {
    $scope.places = [];

    $http({
        method: 'GET',
        url: '/api/places'
    }).then(successCallback, errorCallback);

    function successCallback(response) {
        console.log(response);
        if(response.data.success){
            $scope.places = response.data.data;
        }else{
            console.log('Error:' + response.data.message);
        }
    }

    function errorCallback(response) {
        console.log('Internal server error');
    }

}]);
