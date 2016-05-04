'use strict';

angular.module('common').controller('ConfirmationController', ['$scope', '$uibModalInstance', 'data', function ($scope, $uibModalInstance, data) {
    $scope.title = data.title;
    $scope.message = data.message;

    $scope.ok = function () {
        $uibModalInstance.close('ok');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
}]);
