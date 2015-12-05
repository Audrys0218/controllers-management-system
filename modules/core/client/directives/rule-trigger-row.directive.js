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
            controller: function ($scope, sensorsModel, sensorsTypesModel, operatorsModel) {

                function getSelectedSensorType(){
                    return $scope.sensors.find(function (s) {
                        return s.id === $scope.trigger.sensor;
                    });
                }

                $scope.operators = operatorsModel.model;

                $scope.sensors = [];

                $scope.name = 'trigger_name_' + $scope.index;

                $scope.trigger.compareType = $scope.trigger.compareType || '>';

                sensorsModel.load().then(function () {
                    $scope.sensors = sensorsModel.model.sensors.map(function (s) {
                        return {
                            id: s.id,
                            label: s.placeTitle + '\\' + s.title,
                            type: s.type
                        };
                    });

                    $scope.trigger.sensor = $scope.trigger.sensor || $scope.sensors[0].id;

                    $scope.getMin = function(){
                        var selectedSensor = getSelectedSensorType();
                        return selectedSensor && sensorsTypesModel.model[selectedSensor.type].min ? sensorsTypesModel.model[selectedSensor.type].min : 0;
                    };

                    $scope.getMax = function(){
                        var selectedSensor = getSelectedSensorType();
                        return selectedSensor && sensorsTypesModel.model[selectedSensor.type].max ? sensorsTypesModel.model[selectedSensor.type].max : 0;
                    };

                    $scope.getValidationMessage = function () {
                        var formField;
                        if($scope.form && $scope.form[$scope.name]){
                            formField = $scope.form[$scope.name];
                            if(formField.$error.required){
                                return 'Field is required';
                            }

                            if(formField.$error.min || formField.$error.max){
                                return 'Field should be between ' + $scope.getMin() + ' and ' + $scope.getMax();
                            }
                        }

                        return '';
                    };
                });
            },
            link: function ($scope, element, attr, ctrl) {
                $scope.form = ctrl;
            }
        };
    });
