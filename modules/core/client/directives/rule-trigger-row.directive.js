'use strict';

angular.module('core')
    .directive('ruleTriggerRow', function () {
        return {
            restrict: 'E',
            require: '^form',
            templateUrl: 'modules/core/client/directives/rule-trigger-row.html',
            scope: {
                onRemove: '&',
                index: '=',
                trigger: '='
            },
            controller: function ($scope, sensorsOptionsModel, sensorsTypesModel, operatorsModel) {

                $scope.operators = operatorsModel.model;

                $scope.sensorsOptionsModel = sensorsOptionsModel.model;

                $scope.name = 'trigger_name_' + $scope.index;

                $scope.trigger.compareType = $scope.trigger.compareType || '>';

                sensorsOptionsModel.load();
            },
            link: function ($scope, element, attr, ctrl) {
                $scope.form = ctrl;
            }
        };
    });
