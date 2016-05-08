'use strict';

angular.module('core')
    .factory('microcontrollersModel', function($http, $q) {

        var model = {
            microcontrollers: [],
            loading: false
        };

        var load = function() {
            model.loading = true;
            return $http.get('/api/v1/microcontroller').then(function(response) {
                model.microcontrollers = response.data;
            }).finally(removeLoader);
        };

        var save = function(microcontroller) {
            model.loading = true;
            if (microcontroller.id) {
                return $http.put('/api/v1/microcontroller/' + microcontroller.id, microcontroller).then(load).finally(removeLoader);
            } else {
                return $http.post('/api/v1/microcontroller', microcontroller).then(load).finally(removeLoader);
            }
        };

        var get = function(id) {
            return $http.get('api/v1/microcontroller/' + id);
        };

        function removeLoader() {
            model.loading = false;
        }

        var deleteMicrocontroller = function(controllerId) {
            model.loading = true;
            $http.delete('/api/v1/microcontroller/' + controllerId).then(load).finally(removeLoader);
        };

        var bulkDelete = function() {
            var promises = [];

            model.microcontrollers.forEach(deleteItem);

            function deleteItem(microcontrollers) {
                if (microcontrollers.isSelected) {
                    promises.push($http.delete('/api/v1/microcontroller/' + microcontrollers.id));
                }
            }

            $q.all(promises).then(load);
        };

        var bulkDeleteDisabled = function() {
            return !model.microcontrollers.some(function(microcontroller) {
                return microcontroller.isSelected;
            });
        };

        return {
            model: model,
            delete: deleteMicrocontroller,
            load: load,
            save: save,
            get: get,
            bulkDelete: bulkDelete,
            bulkDeleteDisabled: bulkDeleteDisabled
        };
    });
