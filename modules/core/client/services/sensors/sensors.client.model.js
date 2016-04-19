'use strict';

angular.module('core')
    .factory('sensorsModel', ['$http', 'addEditService', 'confirmation', 'microcontrollersModel', 'sensorsTypesModel', function ($http, addEditService, confirmation, microcontrollersModel, sensorsTypesModel) {

        var model = {
            sensors: []
        };

        var load = function () {
            return $http({
                method: 'GET',
                url: '/api/v1/sensors'
            }).then(function (response) {
                model.sensors = response.data;
            });
        };

        var addEdit = function (sensorId) {
            microcontrollersModel.load().then(callAddEditModal);

            function callAddEditModal() {
                var dataModel = {
                    microcontrollers: microcontrollersModel.model.microcontrollers,
                    sensorsTypes: sensorsTypesModel.model
                };

                addEditService.open({
                    templateUrl: 'modules/core/client/views/sensors/sensors.add-edit.client.view.html',
                    apiUrl: '/api/v1/sensors/',
                    modelId: sensorId,
                    dataModel: dataModel,
                    editTitle: 'Edit sensor',
                    addTitle: 'Add new sensor'
                }).then(load);
            }
        };

        var deleteSensor = function (sensorId) {
            confirmation.confirm('Warning!', 'Do you really want to delete this item?', function () {
                $http({
                    method: 'DELETE',
                    url: '/api/v1/sensors/' + sensorId
                }).then(load);
            });
        };

        return {
            model: model,
            load: load,
            addEdit: addEdit,
            delete: deleteSensor
        };
    }]);
