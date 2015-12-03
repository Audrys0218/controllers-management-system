'use strict';

angular.module('core')
    .directive('inlineControllerValueEdit', function ($timeout) {
        return {
            restrict: 'E',
            templateUrl: 'modules/core/client/directives/inline-controller-value-edit.html',
            scope: {
                controller: '='
            },
            controller: function ($scope, controllersModel) {
                $scope.editMode = false;
                $scope.valueCopy = angular.copy($scope.controller.value);

                $scope.save = function () {
                    controllersModel.changeValue($scope.controller.id, $scope.valueCopy).then(function (response) {
                        if (response.data.success) {
                            $scope.controller.value = $scope.valueCopy;
                            $scope.cancelEditMode();
                        }
                    });
                };

                $scope.cancelEditMode = function(){
                    if(!angular.equals($scope.controller.value, $scope.valueCopy)){
                        $scope.valueCopy = angular.copy($scope.controller.value);
                    };

                    $scope.editMode = false;
                };
            },
            link: function ($scope, element, attr) {
                $scope.startEditMode = function () {
                    $scope.editMode = true;
                    $timeout(function () {
                        element.find('input')[0].focus();
                    }, 0);
                };
            }
        };
    });
