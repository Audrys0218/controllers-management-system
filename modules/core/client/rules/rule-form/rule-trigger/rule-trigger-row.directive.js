'use strict';

angular.module('core')
    .directive('ruleTriggerRow', function() {
        return {
            restrict: 'E',
            require: '^form',
            templateUrl: 'modules/core/client/rules/rule-form/rule-trigger/rule-trigger-row.html',
            scope: {
                onRemove: '&',
                index: '=',
                trigger: '='
            },
            controller: 'RuleTriggerController',
            link: function($scope, element, attr, ctrl) {
                $scope.form = ctrl;
            }
        };
    });
