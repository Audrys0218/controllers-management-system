'use strict';

angular.module('core')
    .factory('controllersModel',
        function ($http, addEditService, confirmation, microcontrollersModel, controllersTypesModel, $q, $timeout) {

            var model = {
                controllers: []
            };

            var load = function () {
                return $http({
                    method: 'GET',
                    url: '/api/v1/controllers'
                }).then(function (response) {
                    model.controllers = response.data;
                    // $timeout(function () {
                    //     $('[type="checkbox"]').bootstrapSwitch({size: 'mini'});
                    // });
                });
            };

            var addEdit = function (controllerId) {
                microcontrollersModel.load().then(callAddEditModal);

                function callAddEditModal() {
                    var dataModel = {
                        microcontrollers: microcontrollersModel.model.microcontrollers,
                        controllersTypes: controllersTypesModel.model
                    };

                    addEditService.open({
                        templateUrl: 'modules/core/client/views/controllers/controllers.add-edit.client.view.html',
                        apiUrl: '/api/v1/controllers/',
                        modelId: controllerId,
                        dataModel: dataModel,
                        editTitle: 'Edit controller',
                        addTitle: 'Add new controller'
                    }).then(load);
                }
            };

            var deleteController = function (controllerId) {
                confirmation.confirm('Warning!', 'Do you really want to delete this item?', function () {
                    $http({
                        method: 'DELETE',
                        url: '/api/v1/controllers/' + controllerId
                    }).then(load);
                });
            };

            var bulkDelete = function () {
                confirmation.confirm('Warning!', 'Do you really want to delete these items?', function () {
                    var promises = [];

                    model.controllers.forEach(deleteItem);

                    function deleteItem(controller) {
                        if (controller.isSelected) {
                            promises.push($http({
                                method: 'DELETE',
                                url: '/api/v1/controllers/' + controller.id
                            }));
                        }
                    }

                    $q.all(promises).then(load);
                });
            };

            var changeValue = function (controllerId, value) {
                return $http.put('/api/v1/controllers/' + controllerId + '/value', {value: value});

            };

            return {
                model: model,
                load: load,
                addEdit: addEdit,
                delete: deleteController,
                changeValue: changeValue
            };

        });
