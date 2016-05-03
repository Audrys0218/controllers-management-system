'use strict';

angular.module('core')
    .factory('actuatorsModel',
        function ($http, addEditService, confirmation, microcontrollersModel, actuatorsTypesModel, $q) {

            var model = {
                actuators: [],
                loading: false
            };

            var load = function () {
                model.loading = true;
                return $http({
                    method: 'GET',
                    url: '/api/v1/actuator'
                }).then(function (response) {
                    model.actuators = response.data;
                }).finally(function(){
                    model.loading = false;
                });
            };

            var addEdit = function (id) {
                microcontrollersModel.load().then(callAddEditModal);

                function callAddEditModal() {
                    var dataModel = {
                        microcontrollers: microcontrollersModel.model.microcontrollers,
                        controllersTypes: actuatorsTypesModel.model
                    };

                    addEditService.open({
                        templateUrl: 'modules/core/client/views/actuators/actuators.add-edit.client.view.html',
                        apiUrl: '/api/v1/actuator/',
                        modelId: id,
                        dataModel: dataModel,
                        editTitle: 'Edit actuator',
                        addTitle: 'Add actuator'
                    }).then(load);
                }
            };

            var deleteActuator = function (controllerId) {
                confirmation.confirm('Warning!', 'Do you really want to delete this item?', function () {
                    $http({
                        method: 'DELETE',
                        url: '/api/v1/actuator/' + controllerId
                    }).then(load);
                });
            };

            var bulkDelete = function () {
                confirmation.confirm('Warning!', 'Do you really want to delete these items?', function () {
                    var promises = [];

                    model.actuators.forEach(deleteItem);

                    function deleteItem(actuator) {
                        if (actuator.isSelected) {
                            promises.push($http({
                                method: 'DELETE',
                                url: '/api/v1/actuator/' + actuator.id
                            }));
                        }
                    }

                    $q.all(promises).then(load);
                });
            };

            var changeValue = function (actuator) {
                actuator.value = + actuator.value; //converting boolean values to int
                return $http.put('/api/v1/actuator/' + actuator.id + '/value', {value: actuator.value});
            };

            return {
                model: model,
                load: load,
                addEdit: addEdit,
                delete: deleteActuator,
                bulkDelete: bulkDelete,
                changeValue: changeValue
            };

        });
