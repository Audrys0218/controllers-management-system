'use strict';

angular.module('core')
    .controller('AddEditRuleController', ['$scope', '$uibModalInstance', 'conjunctionsTypes', 'rulesModel', 'data',
        function ($scope, $uibModalInstance, conjunctionsTypes, rulesModel, data) {

            $scope.conjunctionsTypes = conjunctionsTypes.model;
            $scope.rule = angular.copy(rulesModel.model.defaultRuleObject);

            if (data.modelId) {
                rulesModel.get(data.modelId).then(function (response) {
                    $scope.rule = response.data;
                });
            }

            $scope.save = function () {
                rulesModel.save($scope.rule).then(function () {
                    $uibModalInstance.dismiss();
                });
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss();
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

            $scope.getValidationMessage = function () {
                return $scope.form && $scope.form.title && $scope.form.title.$error.required ? 'Title is required' : '';
            };

        }]);
