'use strict';

angular.module('core').controller('AddEditController', ['$scope', '$modalInstance', '$http', 'data', function ($scope, $modalInstance, $http, data) {
    $scope.model = data.model ? angular.copy(data.model) : {};

    window.audrius = $scope.model;

    $scope.dataModel = data.dataModel;

    $scope.title = data.title;

    $scope.save = function () {
        if($scope.model._id){
            $http.put(data.apiUrl + $scope.model._id, {model: $scope.model}).then(successCallback);
        } else {
            $http.post(data.apiUrl, {model: $scope.model}).then(successCallback);
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };

    function successCallback(response) {
        if(response.data.success){
            $modalInstance.close(response.data.data);
        } else {
            //throw 'Error was got from server when creating or editing';
        }
    }
}]);
