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
            controller: function($scope, sensorsOptionsModel, sensorsTypesModel, operatorsModel) {

                $scope.name = 'trigger_name_' + $scope.index;

                $scope.operators = operatorsModel.model;

                $scope.sensorsOptionsModel = sensorsOptionsModel.model;

                $scope.trigger.compareType = $scope.trigger.compareType || '>';

                sensorsOptionsModel.load().then(function() {
                    $scope.trigger.sensor = $scope.trigger.sensor || sensorsOptionsModel.model.sensorsOptions[0].id;

                    $scope.getMin = function() {
                        var selectedOptionType = sensorsOptionsModel.model.sensorsOptions.find(function(s){
                            return s.id === $scope.trigger.sensor;
                        }).type;

                        return sensorsTypesModel.model[selectedOptionType].min;
                    };

                    $scope.getMax = function() {
                        var selectedOptionType = sensorsOptionsModel.model.sensorsOptions.find(function(s){
                            return s.id === $scope.trigger.sensor;
                        }).type;

                        return sensorsTypesModel.model[selectedOptionType].max;
                    };

                    $scope.getValidationMessage = function(){
                        var min = $scope.getMin(),
                            max = $scope.getMax();

                        if(!$scope.trigger.value || $scope.trigger.value < min || $scope.trigger.value > max){
                            return 'Value should be between ' + min + ' and ' + max;
                        }

                        return '';
                    };
                });
            },
            link: function($scope, element, attr, ctrl) {
                $scope.form = ctrl;
            }
        };
    });
