'use strict';
angular.module('core').directive('tbShowSpinner', function () {
    return {
        restrict: 'A',
        scope: {
            'tbShowSpinner': '&'
        },
        link: function ($scope, element) {
            //$scope.spinner = new window.Spinner();
            //if ($scope.tbShowSpinner()) {
            //    $scope.spinner.spin(element);
            //} else {
            //    $scope.spinner.stop();
            //}
        }
    };
});
