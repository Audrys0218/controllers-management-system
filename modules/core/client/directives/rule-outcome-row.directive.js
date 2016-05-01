'use strict';

angular.module('core')
    .directive('ruleOutcomeRow', function () {
        return {
            restrict: 'E',
            require: '^form',
            templateUrl: 'modules/core/client/directives/rule-outcome-row.html',
            scope: {
                onRemove: '&',
                index: '=',
                outcome: '='
            },
            controller: function ($scope, actuatorsOptionsModel) {

                $scope.actuatorsOptionsModel = actuatorsOptionsModel.model;

                $scope.name = 'outcome_name_' + $scope.index;

                actuatorsOptionsModel.load();
            },
            link: function ($scope, element, attr, ctrl) {
                $scope.form = ctrl;
            }
        };
    });
