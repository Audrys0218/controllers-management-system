'use strict';

angular.module('core')
    .factory('sensorsModel', ['$http', 'addEditService', 'confirmation', 'placesModel', function ($http, addEditService, confirmation, placesModel) {

        var model = {
            sensors: []
        };

        var load = function () {
            $http({
                method: 'GET',
                url: '/api/v1/sensors'
            }).then(successCallback);

            function successCallback(response) {
                if (response.data.success) {
                    model.sensors = response.data.data;
                } else {
                    window.console.log('Error:' + response.data.message);
                }
            }
        };

        var addEdit = function (sensor) {
            placesModel.load().then(callAddEditModal);

            function callAddEditModal(){
                var dataModel = {
                    places: placesModel.model.places
                };

                addEditService.open({
                    templateUrl: 'modules/core/client/views/sensors/sensors.add-edit.client.view.html',
                    apiUrl: '/api/v1/sensors/',
                    model: sensor,
                    dataModel: dataModel,
                    editTitle: 'Edit sensor',
                    addTitle: 'Add new sensor'
                }).then(addOrEdit);

                function addOrEdit(response) {
                    var elementIndex = model.sensors.map(function (p) {
                        return p._id;
                    }).indexOf(response.data._id);

                    if (elementIndex > -1) {
                        model.sensors[elementIndex] = response.data;
                    } else {
                        model.sensors.push(response.data);
                    }
                }
            }
        };

        var deleteSensor = function (sensor) {
            confirmation.confirm('Warning!', 'Do you really want to delete this item?', function () {
                $http({
                    method: 'DELETE',
                    url: '/api/v1/sensors/' + sensor._id
                }).then(function (response) {
                    var index = model.sensors.indexOf(sensor);
                    if(response.data.success){
                        model.sensors.splice(index, 1);
                    }
                });
            });
        };

        return {
            model: model,
            load: load,
            addEdit: addEdit,
            delete: deleteSensor
        };
    }]);
