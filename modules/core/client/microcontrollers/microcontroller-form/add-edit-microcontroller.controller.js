'use strict';

angular.module('core')
    .controller('AddEditMicrocontrollerController',
        function ($scope, $uibModalInstance, microcontrollersModel, pingService, data) {

            $scope.microcontroller = {};
            $scope.pingModel = pingService.model;
            $scope.pingModel.isAlive = false;
            $scope.title = 'Add microcontroller';
            $scope.places = data.places;

            if (data.modelId) {
                $scope.title = 'Edit microcontroller';
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
        });
