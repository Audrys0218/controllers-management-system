'use strict';

angular.module('common').controller('AddEditController', ['$scope', '$uibModalInstance', '$http', 'data', function ($scope, $uibModalInstance, $http, data) {

    $scope.model = {};
    $scope.loading = false;

    loadModelIfExist();

    $scope.dataModel = data.dataModel;

    $scope.title = data.title;

    $scope.save = function () {
        $scope.loading = true;
        if ($scope.model.id) {
            $http.put(data.apiUrl + $scope.model.id, $scope.model).then(closeModal).finally(removeLoader);
        } else {
            $http.post(data.apiUrl, $scope.model).then(closeModal).finally(removeLoader);
        }

        function closeModal(response) {
            $uibModalInstance.close(response.data);
        }

        function removeLoader() {
            $scope.loading = false;
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    function loadModelIfExist() {
        if (data.modelId) {
            $http.get(data.apiUrl + data.modelId).then(function (response) {
                $scope.model = response.data;
            });
        }
    }
}]);
