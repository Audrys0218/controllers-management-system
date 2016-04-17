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
                        url: '/api/v1/microcontrollers/' + controllerId
                    }).then(load);
                });
            };

            return {
                model: model,
                delete: deleteController,
                load: load
            };
        }]);
