'use strict';

angular.module('core')
    .controller('RulesController', ['$scope', '$modal', function ($scope, $modal) {

        $scope.model = {};

        $scope.model.rules = [{
            id: '',
            title: 'Tite1'
        }, {
            id: '',
            title: 'Tite2'
        }
        ];

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
    }]);
