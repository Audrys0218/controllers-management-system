'use strict';

angular.module('core')
    .directive('ruleOutcomeRow', function () {
        return {
            restrict: 'E',
            templateUrl: 'modules/core/client/directives/rule-outcome-row.html',
            scope: {
                onRemove: '&',
                index: '=',
                outcome: '='
            },
            controller: function($scope, controllersModel){
                controllersModel.load().then(function () {
                    $scope.controllers = controllersModel.model.controllers.map(function (c) {
                        return {
                            id: c.id,
                            label: c.placeTitle + '\\' + c.title
                        };
                    });
                });
            }
        };
    });
