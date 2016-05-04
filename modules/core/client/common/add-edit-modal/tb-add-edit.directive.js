'use strict';

angular.module('common')
    .directive('tbAddEdit', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: false,
            templateUrl: 'modules/core/client/common/add-edit-modal/tb-add-edit.html'
        };
    });
