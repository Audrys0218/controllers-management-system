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
            controller: function ($scope, controllersOptionsModel) {

                $scope.controllersOptionsModel = controllersOptionsModel.model;

                $scope.name = 'outcome_name_' + $scope.index;

                controllersOptionsModel.load();
            },
            link: function ($scope, element, attr, ctrl) {
                $scope.form = ctrl;
            }
        };
    });
