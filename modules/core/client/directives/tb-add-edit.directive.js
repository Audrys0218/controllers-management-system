'use strict';

angular.module('core')
    .directive('tbAddEdit', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: false,
            templateUrl: 'modules/core/client/directives/tb-add-edit.html'
        };
    });
