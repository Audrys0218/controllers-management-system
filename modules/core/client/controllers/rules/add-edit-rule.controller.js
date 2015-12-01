'use strict';

angular.module('core')
    .controller('AddEditRuleController', ['$scope', '$modalInstance', 'sensorsModel', 'controllersModel', 'operatorsModel', 'conjunctionsTypes', 'rulesModel', 'data', 'sensorsTypesModel',
        function ($scope, $modalInstance, sensorsModel, controllersModel, operatorsModel, conjunctionsTypes, rulesModel, data, sensorsTypesModel) {

            $scope.conjunctionsTypes = conjunctionsTypes.model;
            $scope.rule = angular.copy(rulesModel.model.defaultRuleObject);

            $scope.sensorsTypesModel = sensorsTypesModel.model;

            if (data.modelId) {
                rulesModel.get(data.modelId).then(function (response) {
                    if (response.data.success) {
                        $scope.rule = response.data.data;
                    }
                });
            }

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

            $scope.removeTrigger = function (index) {
                $scope.rule.triggers.splice(index, 1);
            };

        }]);
