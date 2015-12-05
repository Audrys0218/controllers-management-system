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
            controller: function($scope, controllersModel, controllersTypesModel){
                function getSelectedController(){
                    return $scope.controllers.find(function (s) {
                        return s.id === $scope.outcome.controller;
                    });
                }
                
                $scope.controllers = [];

                $scope.name = 'outcome_name_' + $scope.index;

                controllersModel.load().then(function () {
                    $scope.controllers = controllersModel.model.controllers.map(function (c) {
                        return {
                            id: c.id,
                            label: c.placeTitle + '\\' + c.title,
                            type: c.type
                        };
                    });

                    $scope.outcome.controller = $scope.outcome.controller || $scope.controllers[0].id;

                    $scope.getMin = function(){
                        var selectedController = getSelectedController();
                        return selectedController && controllersTypesModel.model[selectedController.type].min ? controllersTypesModel.model[selectedController.type].min : 0;
                    };

                    $scope.getMax = function(){
                        var selectedController = getSelectedController();
                        return selectedController && controllersTypesModel.model[selectedController.type].max ? controllersTypesModel.model[selectedController.type].max : 0;
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
