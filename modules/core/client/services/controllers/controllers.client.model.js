'use strict';

angular.module('core')
    .factory('controllersModel', ['$http', 'addEditService', 'confirmation', 'placesModel', 'controllersTypesModel',
        function ($http, addEditService, confirmation, placesModel, controllersTypesModel) {

            var model = {
                controllers: []
            };

            var load = function () {
                return $http({
                    method: 'GET',
                    url: '/api/v1/controllers'
                }).then(successCallback);

                function successCallback(response) {
                    if (response.data.success) {
                        model.controllers = response.data.data;
                    } else {
                        window.console.log('Error:' + response.data.message);
                    }
                }
            };

            var addEdit = function (controllerId) {
                placesModel.load().then(callAddEditModal);

                function callAddEditModal() {
                    var dataModel = {
                        places: placesModel.model.places,
                        controllersTypes: controllersTypesModel.model
                    };

                    addEditService.open({
                        templateUrl: 'modules/core/client/views/controllers/controllers.add-edit.client.view.html',
                        apiUrl: '/api/v1/controllers/',
                        modelId: controllerId,
                        dataModel: dataModel,
                        editTitle: 'Edit sensor',
                        addTitle: 'Add new sensor'
                    }).then(load);
                }
            };

            var deletePlace = function (controllerId) {
                confirmation.confirm('Warning!', 'Do you really want to delete this item?', function () {
                    $http({
                        method: 'DELETE',
                        url: '/api/v1/controllers/' + controllerId
                    }).then(load);
                });
            };

            return {
                model: model,
                load: load,
                addEdit: addEdit,
                delete: deletePlace
            };

        }]);
