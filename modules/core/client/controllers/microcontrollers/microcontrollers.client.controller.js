'use strict';

angular.module('core')
    .controller('MicrocontrollersController',
        function ($scope, microcontrollersModel, $uibModal, placesModel) {
            $scope.microcontrollersModel = microcontrollersModel.model;
            $scope.searchText = '';
            $scope.addEdit = function (microcontrollerId) {
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

            $scope.delete = function (id) {
                microcontrollersModel.delete(id);
            };


            $scope.bulkDelete = microcontrollersModel.bulkDelete;
            $scope.bulkDeleteDisabled = function () {
                return !microcontrollersModel.model.microcontrollers.some(function (microcontroller) {
                    return microcontroller.isSelected;
                });
            };

            microcontrollersModel.load();
        });
