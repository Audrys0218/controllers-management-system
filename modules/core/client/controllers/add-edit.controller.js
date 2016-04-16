'use strict';

angular.module('core').controller('AddEditController', ['$scope', '$uibModalInstance', '$http', 'data', function ($scope, $uibModalInstance, $http, data) {

    $scope.model = {};

    loadModelIfExist();

    $scope.dataModel = data.dataModel;

    $scope.title = data.title;

    $scope.save = function () {
        if ($scope.model.id) {
            $http.put(data.apiUrl + $scope.model.id, {model: $scope.model}).then(successCallback);
        } else {
            $http.post(data.apiUrl, {model: $scope.model}).then(successCallback);
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    function successCallback(response) {
        $uibModalInstance.close(response.data);
    }

    function loadModelIfExist() {
        if (data.modelId) {
            $http.get(data.apiUrl + data.modelId).then(function (response) {
                $scope.model = response.data;
            });
        }
    }
}]);
