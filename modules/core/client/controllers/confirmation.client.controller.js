'use strict';

angular.module('core').controller('ConfirmationController', ['$scope', '$modalInstance', 'data', function ($scope, $modalInstance, data) {

    $scope.title = data.title;
    $scope.message = data.message;

    $scope.ok = function () {
        $modalInstance.close('ok');
    };

    $scope.cancel = function () {
        $modalInstance.dismiss();
    };
}]);
