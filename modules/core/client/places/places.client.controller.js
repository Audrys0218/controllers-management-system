'use strict';

angular.module('core')
    .controller('PlacesController', function($scope, placesModel) {
        $scope.model = placesModel.model;
        $scope.searchText = '';
        $scope.addEdit = placesModel.addEdit;
        $scope.delete = placesModel.delete;
        $scope.bulkDelete = placesModel.bulkDelete;
        $scope.bulkDeleteDisabled = placesModel.bulkDeleteDisabled;
        $scope.load = placesModel.load;
    });
