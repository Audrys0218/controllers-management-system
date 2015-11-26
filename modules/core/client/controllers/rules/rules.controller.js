'use strict';

angular.module('core')
    .controller('RulesController', ['$scope', '$modal', 'rulesModel', function ($scope, $modal, rulesModel) {

        $scope.model = rulesModel.model;

        $scope.addEdit = function (ruleId) {
            var modalInstance = $modal.open({
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
            window.console.log('Delete rule');
        };

        rulesModel.load();

    }]);
