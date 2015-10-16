'use strict';

angular.module('core').controller('AddEditPlaceController', ['$scope', '$modalInstance', '$http', 'place', function ($scope, $modalInstance, $http, place) {
    $scope.place = typeof place !== 'undefined' ? angular.copy(place) : {};

    $scope.save = function () {
        if(typeof  $scope.place._id !== 'undefined'){
            $http.put('/api/places/' + $scope.place._id, {place: $scope.place}).then(successCallback);
        } else {
            $http.post('/api/places/', {place: $scope.place}).then(successCallback);
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    function successCallback() {
        $modalInstance.close($scope.place);
    }
}]);
