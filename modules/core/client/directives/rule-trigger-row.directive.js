'use strict';

angular.module('core')
    .directive('ruleTriggerRow', function () {
        return {
            restrict: 'E',
            templateUrl: 'modules/core/client/directives/rule-trigger-row.html',
            scope: {
                onRemove: '&',
                index: '=',
                trigger: '='
            },
            controller: function($scope, sensorsModel, operatorsModel){

                $scope.operators = operatorsModel.model;

                sensorsModel.load().then(function () {
                    $scope.sensors = sensorsModel.model.sensors.map(function (s) {
                        return {
                            id: s.id,
                            label: s.placeTitle + '\\' + s.title
                        };
                    });
                });
            }
        };
    });
