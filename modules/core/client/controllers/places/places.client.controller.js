'use strict';

angular.module('core')
    .controller('PlacesController', ['$scope', '$http', '$modal', 'confirmation', 'addEditService', 'placesModel', function ($scope, $http, $modal, confirmation, addEditService, placesModel) {
    $scope.model = placesModel.model;

    $scope.addEdit = function(place){
        placesModel.addEdit(place);
    };

    $scope.delete = function(place){
        placesModel.delete(place);
    };

    placesModel.load();
}]);
