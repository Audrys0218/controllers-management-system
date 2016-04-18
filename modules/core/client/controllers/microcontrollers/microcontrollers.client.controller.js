'use strict';

angular.module('core')
    .controller('MicrocontrollersController', ['microcontrollersModel', '$uibModal', 'placesModel',
        function (microcontrollersModel, $uibModal, placesModel) {
            var vm = this;

            vm.microcontrollersModel = microcontrollersModel.model;

            vm.addEdit = function (microcontrollerId) {
                placesModel.load().then(function () {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'modules/core/client/views/microcontrollers/microcontrollers.add-edit.client.view.html',
                        controller: 'AddEditMicrocontrollerController',
                        resolve: {
                            data: function () {
                                return {
                                    modelId: microcontrollerId,
                                    places: placesModel.model.places.map(function (p) {
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
                });
            };

            vm.delete = function (id) {
                microcontrollersModel.delete(id);
            };

            microcontrollersModel.load();
        }]);
