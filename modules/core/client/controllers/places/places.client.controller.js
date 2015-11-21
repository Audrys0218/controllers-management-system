'use strict';

angular.module('core').controller('PlacesController', ['$scope', '$http', '$modal', 'confirmation', 'addEditService', function ($scope, $http, $modal, confirmation, addEditService) {
    $scope.places = [];

    $scope.addEdit = function (place) {
        addEditService.open({
            templateUrl: 'modules/core/client/views/places/place.add-edit.client.view.html',
            apiUrl: '/api/v1/places/',
            model: place,
            editTitle: 'Edit place',
            addTitle: 'Add place'
        }).then(addOrEdit);

        function addOrEdit(response) {
            var elementIndex = $scope.places.map(function(p){
                return p._id;
            }).indexOf(response.data._id);

            if (elementIndex > -1){
                $scope.places[elementIndex] = response.data;
            } else {
                $scope.places.push(response.data);
            }
        }
    };

    $scope.delete = function (place, index) {
        confirmation.confirm('Warning!', 'Do you really want to delete this item?', function () {
            $http({
                method: 'DELETE',
                url: '/api/v1/places/' + place._id
            }).then(function () {
                $scope.places.splice(index, 1);
            }, errorCallback);
        });
    };

    $http({
        method: 'GET',
        url: '/api/v1/places'
    }).then(successCallback, errorCallback);

    function successCallback(response) {
        if (response.data.success) {
            $scope.places = response.data.data;
        } else {
            window.console.log('Error:' + response.data.message);
        }
    }

    function errorCallback() {
        console.log('Internal server error');
    }

}]);
