'use strict';

angular.module('core')
    .controller('MicrocontrollersController', ['microcontrollersModel', '$uibModal', 'placesModel',
        function (microcontrollersModel, $uibModal, placesModel) {
            var vm = this;

            vm.microcontrollersModel = microcontrollersModel.model;

            vm.addEdit = function (microcontrollerId) {
                placesModel.load();
                var modalInstance = $uibModal.open({
                    templateUrl: 'modules/core/client/views/microcontrollers/microcontrollers.add-edit.client.view.html',
                    controller: 'MicrocontrollersController',
                    resolve: {
                        data: function () {
                            return {
                                modelId: placesModel.model.places.map(function (p) {
                                    return {
                                        id: p.id,
                                        title: p.title
                                    };
                                })
                            };
                        }
                    }
                });

                modalInstance.result.then();

            };

            vm.delete = function (ruleId) {
                microcontrollersModel.delete(ruleId);
            };

            microcontrollersModel.load();
        }]);
