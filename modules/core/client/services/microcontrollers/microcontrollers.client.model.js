'use strict';

angular.module('core')
    .factory('microcontrollersModel', ['$http', 'confirmation',
        function ($http, confirmation) {

            var model = {
                microcontrollers: []
            };

            var load = function () {
                return $http({
                    method: 'GET',
                    url: '/api/v1/microcontroller'
                }).then(function (response) {
                    model.microcontrollers = response.data;
                });
            };

            var deleteController = function (controllerId) {
                confirmation.confirm('Warning!', 'Do you really want to delete this item?', function () {
                    $http({
                        method: 'DELETE',
                        url: '/api/v1/microcontroller/' + controllerId
                    }).then(load);
                });
            };

            var save = function (microcontroller) {
                if (microcontroller.id) {
                    return $http.put('/api/v1/microcontroller/' + microcontroller.id, microcontroller).then(load);
                } else {
                    return $http.post('/api/v1/microcontroller', microcontroller).then(load);
                }
            };

            var get = function (id) {
                return $http.get('api/v1/microcontroller/' + id);
            };

            return {
                model: model,
                delete: deleteController,
                load: load,
                save: save,
                get: get
            };
        }]);
