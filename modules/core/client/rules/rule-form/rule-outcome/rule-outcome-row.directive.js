'use strict';

angular.module('core')
    .directive('ruleOutcomeRow', function () {
        return {
            restrict: 'E',
            require: '^form',
            templateUrl: 'modules/core/client/rules/rule-form/rule-outcome/rule-outcome-row.html',
            scope: {
                onRemove: '&',
                index: '=',
                outcome: '='
            },
            controller: 'RuleOutcomeController',
            link: function ($scope, element, attr, ctrl) {
                $scope.form = ctrl;
            }
        };
    });