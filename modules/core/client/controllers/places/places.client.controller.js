'use strict';

angular.module('core')
    .controller('PlacesController', ['$scope', 'placesModel', 'alertService', function ($scope, placesModel) {
        $scope.model = placesModel.model;
        $scope.searchText = '';
        
        $scope.addEdit = function (placeId) {
            placesModel.addEdit(placeId);
        };

        $scope.delete = function (placeId) {
            placesModel.delete(placeId);
        };


        placesModel.load();
    }]);
