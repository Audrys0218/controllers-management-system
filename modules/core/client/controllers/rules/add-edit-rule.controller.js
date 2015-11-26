'use strict';

angular.module('core')
    .controller('AddEditRuleController', ['$scope', '$modalInstance', 'sensorsModel', 'controllersModel', '$q', 'operatorsModel', 'conjunctionsTypes', 'rulesModel', 'ruleDefaultModel', 'data',
        function ($scope, $modalInstance, sensorsModel, controllersModel, $q, operatorsModel, conjunctionsTypes, rulesModel, ruleDefaultModel, data) {

            $scope.conjunctionsTypes = conjunctionsTypes.model;
            $scope.operators = operatorsModel.model;
            $scope.rule = ruleDefaultModel.model.rule;
            $scope.optionsModel = {
                sensors: [],
                controllers: [],
            };


            if (data.modelId) {
                rulesModel.get(data.modelId).then(function (response) {
                    if (response.data.success) {
                        $scope.rule = response.data.data;
                    }
                });
            }

            $q.all([sensorsModel.load(), controllersModel.load()]).then(function () {
                    $scope.optionsModel.sensors = sensorsModel.model.sensors.map(function (s) {
                        return {
                            id: s.id,
                            label: s.placeTitle + '\\' + s.title
                        };
                    });

                    $scope.optionsModel.controllers = controllersModel.model.controllers.map(function (c) {
                        return {
                            id: c.id,
                            label: c.placeTitle + '\\' + c.title
                        };
                    });
                }
            );

            $scope.save = function () {
                rulesModel.save($scope.rule).then(function () {
                    $modalInstance.dismiss();
                });
            };

            $scope.cancel = function () {
                $modalInstance.dismiss();
            };

            $scope.addTrigger = function(){
                $scope.rule.triggers.push({
                    operator: '='
                });
            };

            $scope.removeTrigger = function(index){
                $scope.rule.triggers.splice(index, 1);
            };

            $scope.addOutcome = function(){
                $scope.rule.outcomes.push({});
            };

            $scope.removeOutcome = function(index){
                $scope.rule.outcomes.splice(index, 1);
            };

        }]);
