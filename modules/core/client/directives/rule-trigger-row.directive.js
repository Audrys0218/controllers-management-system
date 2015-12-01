'use strict';

angular.module('core')
    .directive('ruleTriggerRow', function () {
        return {
            require: '^form',
            restrict: 'E',
            templateUrl: 'modules/core/client/directives/rule-trigger-row.html',
            scope: {
                onRemove: '&',
                index: '=',
                trigger: '='
            },
            controller: function ($scope, sensorsModel, sensorsTypesModel, operatorsModel) {

                $scope.operators = operatorsModel.model;

                $scope.sensors = [];

                sensorsModel.load().then(function () {
                    $scope.sensors = sensorsModel.model.sensors.map(function (s) {
                        return {
                            id: s.id,
                            label: s.placeTitle + '\\' + s.title,
                            type: s.type
                        };
                    });
                });

                $scope.getValidationMessage = function () {
                    var selectedType = $scope.sensors.find(function (s) {
                        return s.id === $scope.trigger.sensor;
                    });

                    if (selectedType) {
                        var min = sensorsTypesModel.model[selectedType.type].min;
                        var max = sensorsTypesModel.model[selectedType.type].max;
                        if ($scope.trigger.value < min || $scope.trigger.value > max) {
                            return 'Value should be between ' + min + ' and ' + max;
                        }
                    }

                    if($scope.form && $scope.form[$scope.trigger.id] && $scope.form[$scope.trigger.id].$error.required){
                        return 'Field is required';
                    }

                    return '';
                };
            },
            link: function ($scope, element, attr, ctrl) {
                $scope.form = ctrl;
            }
        };
    });
