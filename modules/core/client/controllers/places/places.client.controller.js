'use strict';

angular.module('core').controller('PlacesController', ['$scope', '$http', '$modal', '$log', function ($scope, $http, $modal, $log) {
    $scope.places = [];

    $scope.edit = function(place){
        $scope.editModel = place;
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modules/core/client/views/places/places.edit.client.view.html',
            size: 'lg',
            scope: $scope
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $http({
        method: 'GET',
        url: '/api/places'
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
