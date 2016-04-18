'use strict';

angular.module('core')
    .factory('microcontrollersModel', ['$http', 'confirmation',
        function ($http, confirmation) {

            var model = {
                microcontrollers: [],
                loading: false
            };

            var load = function () {
                model.loading = true;
                return $http({
                    method: 'GET',
                    url: '/api/v1/microcontroller'
                }).then(function (response) {
                    model.microcontrollers = response.data;
                }).finally(removeLoader);
            };

            var deleteController = function (controllerId) {
                confirmation.confirm('Warning!', 'Do you really want to delete this item?', function () {
                    model.loading = true;
                    $http({
                        method: 'DELETE',
                        url: '/api/v1/microcontroller/' + controllerId
                    }).then(load).finally(removeLoader);
                });
            };

            var save = function (microcontroller) {
                model.loading = true;
                if (microcontroller.id) {
                    return $http.put('/api/v1/microcontroller/' + microcontroller.id, microcontroller).then(load).finally(removeLoader);
                } else {
                    return $http.post('/api/v1/microcontroller', microcontroller).then(load).finally(removeLoader);
                }
            };

            var get = function (id) {
                return $http.get('api/v1/microcontroller/' + id);
            };

            function removeLoader() {
                model.loading = false;
            }

            return {
                model: model,
                delete: deleteController,
                load: load,
                save: save,
                get: get
            };
        }]);
