'use strict';

angular.module('core')
    .controller('RuleOutcomeController',
        function($scope, actuatorsOptionsModel, actuatorsTypesModel) {

            $scope.actuatorsOptionsModel = actuatorsOptionsModel.model;

            $scope.name = 'outcome_name_' + $scope.index;

            $scope.load = function(){
                actuatorsOptionsModel.load().then(function() {
                    $scope.outcome.actuator = $scope.outcome.actuator || actuatorsOptionsModel.model.actuatorsOptions[0].id;

                    $scope.getMin = function() {
                        console.log(actuatorsOptionsModel.model.actuatorsOptions.find(function(a) {
                            return a.id === $scope.outcome.actuator;
                        }).type);
                        console.log($scope.outcome.actuator);
                        var selectedOptionType = actuatorsOptionsModel.model.actuatorsOptions.find(function(a) {
                            return a.id === $scope.outcome.actuator;
                        }).type;

                        return actuatorsTypesModel.model[selectedOptionType].min;
                    };

                    $scope.getMax = function() {
                        var selectedOptionType = actuatorsOptionsModel.model.actuatorsOptions.find(function(s) {
                            return s.id === $scope.outcome.actuator;
                        }).type;

                        return actuatorsTypesModel.model[selectedOptionType].max;
                    };

                    $scope.getValidationMessage = function() {
                        var min = $scope.getMin(),
                            max = $scope.getMax();

                        if (typeof $scope.outcome.value === 'undefined'
                            || typeof $scope.outcome.value === 'string'
                            || $scope.outcome.value < min
                            || $scope.outcome.value > max) {
                            return 'Value should be between ' + min + ' and ' + max;
                        }

                        return '';
                    };
                });
            };
        });
