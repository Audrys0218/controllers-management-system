'use strict';

angular.module('core')
    .controller('AddEditRuleController', ['$scope', '$modalInstance', 'sensorsModel', 'controllersModel', 'operatorsModel', 'conjunctionsTypes', 'rulesModel', 'data', 'sensorsTypesModel',
        function ($scope, $modalInstance, sensorsModel, controllersModel, operatorsModel, conjunctionsTypes, rulesModel, data, sensorsTypesModel) {

            $scope.conjunctionsTypes = conjunctionsTypes.model;
            $scope.operators = operatorsModel.model;
            $scope.rule = angular.copy(rulesModel.model.defaultRuleObject);

            $scope.sensorsTypesModel = sensorsTypesModel.model;

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

            sensorsModel.load().then(function () {
                $scope.optionsModel.sensors = sensorsModel.model.sensors.map(function (s) {
                    return {
                        id: s.id,
                        label: s.placeTitle + '\\' + s.title
                    };
                });
            });

            controllersModel.load().then(function () {
                $scope.optionsModel.controllers = controllersModel.model.controllers.map(function (c) {
                    return {
                        id: c.id,
                        label: c.placeTitle + '\\' + c.title
                    };
                });
            });

            $scope.save = function () {
                rulesModel.save($scope.rule).then(function () {
                    $modalInstance.dismiss();
                });
            };

            $scope.cancel = function () {
                $modalInstance.dismiss();
            };

            $scope.addTrigger = function () {
                $scope.rule.triggers.push({
                    operator: '='
                });
            };

            $scope.addOutcome = function () {
                $scope.rule.outcomes.push({});
            };

            $scope.removeOutcome = function (index) {
                $scope.rule.outcomes.splice(index, 1);
            };

            //$scope.setDefaultSensor = function (trigger) {
            //    trigger.sensor = trigger.sensor || $scope.optionsModel.sensors[0];
            //};
            //
            //$scope.setDefaultController = function (outcome) {
            //    outcome.controller = outcome.controller || $scope.optionsModel.controllers[0];
            //};
        }]);
