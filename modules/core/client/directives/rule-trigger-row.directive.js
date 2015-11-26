'use strict';

angular.module('core')
    .directive('ruleTriggerRow', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'modules/core/client/directives/rule-trigger-row.html',
            controller: function($scope){
                $scope.removeTrigger = function (index) {
                    $scope.rule.triggers.splice(index, 1);
                };

            }
        };
    });
