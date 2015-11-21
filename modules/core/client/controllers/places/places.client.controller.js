'use strict';

angular.module('core')
    .controller('PlacesController', ['$scope', 'placesModel', function ($scope, placesModel) {
    $scope.model = placesModel.model;

    $scope.addEdit = function(place){
        placesModel.addEdit(place);
    };

    $scope.delete = function(place){
        placesModel.delete(place);
    };

    placesModel.load();
}]);
