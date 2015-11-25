'use strict';

angular.module('core')
    .controller('AddEditRuleController', ['$scope', '$modalInstance', 'sensorsModel', 'controllersModel', '$q', 'operatorsModel', 'conjunctionsTypes', 'rulesModel',
          function ($scope, $modalInstance, sensorsModel, controllersModel, $q, operatorsModel, conjunctionsTypes, rulesModel) {

        $scope.conjunctionsTypes = conjunctionsTypes.model;
        $scope.operators = operatorsModel.model;
          rulesModel.load();
        $scope.rule = rulesModel.model.rule;

        $q.when([sensorsModel.load(), controllersModel.load()]).then(function(){
                $scope.sensors = sensorsModel.model.sensors.map(function(s){
                    return {
                        id: s.id,
                        label: s.placeTitle + '\\' + s.title
                    };
                });

                $scope.controllers = controllersModel.model.controllers.map(function(c){
                    return {
                        id: c.id,
                        label: c.placeTitle + '\\' + c.title
                    };
                });
            }
        );

        $scope.save = function () {
            window.console.log('Rule save');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss();
        };
    }]);
