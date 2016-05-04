'use strict';

angular.module('core')
    .factory('sensorsModel', function($http, $q, $interval, addEditService, confirmation, microcontrollersModel, sensorsTypesModel) {

        var model = {
            sensors: [],
            loading: false
        }, intervalPromise;

        var load = function() {
            model.loading = true;
            return $http({
                method: 'GET',
                url: '/api/v1/sensors'
            }).then(function(response) {
                model.sensors = response.data;
            }).finally(function() {
                model.loading = false;
            });
        };

        var addEdit = function(sensorId) {
            microcontrollersModel.load().then(callAddEditModal);

            function callAddEditModal() {
                var dataModel = {
                    microcontrollers: microcontrollersModel.model.microcontrollers,
                    sensorsTypes: sensorsTypesModel.model
                };

                addEditService.open({
                    templateUrl: 'modules/core/client/sensors/sensors.add-edit.client.view.html',
                    apiUrl: '/api/v1/sensors/',
                    modelId: sensorId,
                    dataModel: dataModel,
                    editTitle: 'Edit sensor',
                    addTitle: 'Add sensor'
                }).then(load);
            }
        };

        var deleteSensor = function(sensorId) {
            confirmation.confirm('Warning!', 'Do you really want to delete this item?', function() {
                $http({
                    method: 'DELETE',
                    url: '/api/v1/sensors/' + sensorId
                }).then(load);
            });
        };

        var bulkDelete = function() {
            confirmation.confirm('Warning!', 'Do you really want to delete these items?', function() {
                var promises = [];

                model.sensors.forEach(deleteItem);

                function deleteItem(sensors) {
                    if (sensors.isSelected) {
                        promises.push($http({
                            method: 'DELETE',
                            url: '/api/v1/sensors/' + sensors.id
                        }));
                    }
                }

                $q.all(promises).then(load);
            });
        };

        var startUpdatingSensorsValues = function() {
            intervalPromise = $interval(function() {
                return $http({
                    method: 'GET',
                    url: '/api/v1/sensors/values'
                }).then(function(response) {
                    response.data.forEach(function(sensorValue) {
                        var modelSensor = _.find(model.sensors, ['id', sensorValue.id]);

                        if (modelSensor) {
                            modelSensor.value = sensorValue.value;
                        }
                    });
                });
            }, 1000);
        };

        var stopUpdatingSensorsValues = function() {
            $interval.cancel(intervalPromise);
        };

        return {
            model: model,
            load: load,
            addEdit: addEdit,
            delete: deleteSensor,
            bulkDelete: bulkDelete,
            startUpdatingSensorsValues: startUpdatingSensorsValues,
            stopUpdatingSensorsValues: stopUpdatingSensorsValues
        };
    });
