'use strict';

angular.module('core')
    .controller('AddEditMicrocontrollerController', ['$uibModal', 'microcontrollersModel',
        function ($uibModal, microcontrollersModel) {
            var vm = this;

            // if (data.modelId) {
            //     microcontrollersModel.get(data.modelId).then(function (response) {
            //         $scope.rule = response.data;
            //     });
            // }
            //
            // vm.save = function () {
            //     microcontrollersModel.save($scope.rule).then(function () {
            //         $uibModalInstance.dismiss();
            //     });
            // };
            //
            // vm.cancel = function () {
            //     $uibModalInstance.dismiss();
            // };
        }]);
