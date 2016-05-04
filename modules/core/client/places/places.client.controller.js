'use strict';

angular.module('core')
    .controller('PlacesController', function($scope, placesModel, confirmation) {
        $scope.model = placesModel.model;
        $scope.searchText = '';
        $scope.addEdit = placesModel.addEdit;
        $scope.delete = function(placeId) {
            confirmation.confirm('Warning!', 'Do you really want to delete this item?', function() {
                placesModel.delete(placeId);
            });
        };

        $scope.bulkDelete = function() {
            confirmation.confirm('Warning!', 'Do you really want to delete these items?', function() {
                placesModel.bulkDelete();
            });
        };

        $scope.bulkDeleteDisabled = placesModel.bulkDeleteDisabled;
        $scope.load = placesModel.load;
    });
