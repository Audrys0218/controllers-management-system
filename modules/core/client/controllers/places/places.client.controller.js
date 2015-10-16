'use strict';

angular.module('core').controller('PlacesController', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal) {
    $scope.places = [];

    $scope.edit = function(place){

        var editPlace = function (p) {
            var index = $scope.places.indexOf(place);
            if(index > -1) {
                $scope.places[index] = p;
            }
        };

        var modalInstance = $modal.open({
            templateUrl: 'modules/core/client/views/places/place.add-edit.client.view.html',
            controller: 'AddEditPlaceController',
            size: 'lg',
            resolve: {
                place: function() {
                    return place;
                }
            }
        });

        modalInstance.result.then(editPlace);
    };

    $scope.add = function(){
        var add = function (p) {
            $scope.places.push(p);
        };

        var modalInstance = $modal.open({
            templateUrl: 'modules/core/client/views/places/place.add-edit.client.view.html',
            controller: 'AddEditPlaceController',
            size: 'lg',
            resolve: {
                place: function() {
                    return void(0);
                }
            }
        });

        modalInstance.result.then(add);
    };

    $http({
        method: 'GET',
        url: '/api/v1/places'
    }).then(successCallback, errorCallback);

    function successCallback(response) {
        window.console.log(response);
        if(response.data.success){
            $scope.places = response.data.data;
        }else{
            window.console.log('Error:' + response.data.message);
        }
    }

    function errorCallback(response) {
        console.log('Internal server error');
    }

}]);
