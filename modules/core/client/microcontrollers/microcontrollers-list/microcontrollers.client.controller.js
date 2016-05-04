'use strict';

angular.module('core')
    .controller('MicrocontrollersController',
        function($scope, microcontrollersModel, $uibModal, placesModel, confirmation) {
            $scope.microcontrollersModel = microcontrollersModel.model;
            $scope.searchText = '';
            $scope.addEdit = function(microcontrollerId) {
                placesModel.load().then(function() {
                    var modalInstance = $uibModal.open({
                        templateUrl: 'modules/core/client/microcontrollers/microcontroller-form/microcontrollers.add-edit.client.view.html',
                        controller: 'AddEditMicrocontrollerController',
                        resolve: {
                            data: function() {
                                return {
                                    modelId: microcontrollerId,
                                    places: placesModel.model.places.map(function(p) {
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

            $scope.delete = function(id) {
                confirmation.confirm('Warning!', 'Do you really want to delete this item?', function() {
                    microcontrollersModel.delete(id);
                });
            };

            $scope.bulkDelete = function() {
                confirmation.confirm('Warning!', 'Do you really want to delete these items?', function() {
                    microcontrollersModel.bulkDelete();
                });
            };

            $scope.bulkDeleteDisabled = microcontrollersModel.bulkDeleteDisabled;

            $scope.load = microcontrollersModel.load;
        });
