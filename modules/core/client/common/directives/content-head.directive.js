'use strict';

angular.module('common')
    .directive('contentHead', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'modules/core/client/common/directives/content-head.html'
        };
    });
