'use strict';

angular.module('core')
    .controller('RulesController', ['$scope', '$uibModal', 'rulesModel', function ($scope, $uibModal, rulesModel) {

        $scope.model = rulesModel.model;

        $scope.addEdit = function (ruleId) {
            var modalInstance = $uibModal.open({
                templateUrl: 'modules/core/client/views/rules/rules.add-edit.client.view.html',
                controller: 'AddEditRuleController',
                size: 'lg',
                resolve: {
                    data: function () {
                        return {
                            modelId: ruleId
                        };
                    }
                }
            });

            modalInstance.result.then();

        };

        $scope.delete = function (ruleId) {
            rulesModel.delete(ruleId);
        };

        $scope.bulkDelete = rulesModel.bulkDelete;
        $scope.bulkDeleteDisabled = function () {
            return !rulesModel.model.rules.some(function (rule) {
                return rule.isSelected;
            });
        };

        rulesModel.load();
    }]);
