'use strict';

angular.module('core')
    .controller('SensorsController', ['$scope', 'sensorsModel', function ($scope, sensorsModel) {
        $scope.model = sensorsModel.model;

        $scope.addEdit = function (place) {
            sensorsModel.addEdit(place);
        };

        $scope.delete = function (place) {
            sensorsModel.delete(place);
        };

        sensorsModel.load();
    }]);
