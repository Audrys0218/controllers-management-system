'use strict';

angular.module('core').controller('AddEditController', ['$scope', '$modalInstance', '$http', 'data', function ($scope, $modalInstance, $http, data) {

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
        $modalInstance.dismiss();
    };

    function successCallback(response) {
        if (response.data.success) {
            $modalInstance.close(response.data.data);
        }
    }

    function loadModelIfExist(){
        if(data.modelId){
            $http.get(data.apiUrl + data.modelId).then(function(response){
                if(response.data.success){
                    $scope.model = response.data.data;
                }
            });
        }
    }

}]);
