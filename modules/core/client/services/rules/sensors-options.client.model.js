'use strict';

angular.module('core')
    .factory('sensorsOptionsModel',
        function ($http) {
            var model = {
                sensorsOptions: [],
                loading: false
            };

            var load = function () {
                model.loading = true;
                return $http.get('/api/v1/rules/sensors-options').then(function (response) {
                    model.sensorsOptions = response.data;
                }).finally(function () {
                    model.loading = false;
                });
            };


            return {
                model: model,
                load: load
            };
        });
