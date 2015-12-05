'use strict';

angular.module('core')
    .controller('AddEditRuleController', ['$scope', '$modalInstance', 'conjunctionsTypes', 'rulesModel', 'data',
        function ($scope, $modalInstance, conjunctionsTypes, rulesModel, data) {

            $scope.conjunctionsTypes = conjunctionsTypes.model;
            $scope.rule = angular.copy(rulesModel.model.defaultRuleObject);

            if (data.modelId) {
                rulesModel.get(data.modelId).then(function (response) {
                    if (response.data.success) {
                        $scope.rule = response.data.data;
                    }
                });
            }

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

            $scope.getValidationMessage = function(){
                return $scope.form && $scope.form.title && $scope.form.title.$error.required ? 'Title is required' : '';
            };

        }]);
