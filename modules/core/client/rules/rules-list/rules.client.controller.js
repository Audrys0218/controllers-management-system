'use strict';

angular.module('core')
    .controller('RulesController', function($scope, $uibModal, rulesModel, confirmation) {

        $scope.rulesModel = rulesModel.model;

        $scope.addEdit = function(ruleId) {
            $uibModal.open({
                templateUrl: 'modules/core/client/rules/rule-form/rules.add-edit.client.view.html',
                controller: 'AddEditRuleController',
                size: 'lg',
                resolve: {
                    data: function() {
                        return {
                            modelId: ruleId
                        };
                    }
                }
            });
        };

        $scope.delete = function(ruleId) {
            confirmation.confirm('Warning!', 'Do you really want to delete this item?', function() {
                rulesModel.delete(ruleId);
            });
        };

        $scope.bulkDelete = function() {
            confirmation.confirm('Warning!', 'Do you really want to delete these items?', function() {
                rulesModel.bulkDelete();
            });
        };
        $scope.bulkDeleteDisabled = rulesModel.bulkDeleteDisabled;

        $scope.load = rulesModel.load;
    });
