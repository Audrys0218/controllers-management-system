'use strict';

angular.module('core')
    .controller('AddEditMicrocontrollerController', ['$scope', '$uibModalInstance', 'microcontrollersModel', 'pingService', 'data',
        function ($scope, $uibModalInstance, microcontrollersModel, pingService, data) {

            $scope.microcontroller = {};
            $scope.pingModel = pingService.model;
            $scope.pingModel.isAlive = false;
            $scope.places = data.places;

            if (data.modelId) {
                microcontrollersModel.get(data.modelId).then(function (response) {
                    $scope.microcontroller = response.data;
                    pingService.ping($scope.microcontroller.ip);
                });
            }

            $scope.save = function () {
                microcontrollersModel.save($scope.microcontroller).then(function () {
                    $uibModalInstance.dismiss();
                });
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss();
            };

            $scope.ping = pingService.ping;
        }]);
