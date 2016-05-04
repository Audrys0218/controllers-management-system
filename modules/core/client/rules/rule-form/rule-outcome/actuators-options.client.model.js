'use strict';

angular.module('core')
    .factory('actuatorsOptionsModel',
        function ($http) {
            var model = {
                actuatorsOptions: [],
                loading: false
            };

            var load = function () {
                model.loading = true;
                return $http.get('/api/v1/rules/actuators-options').then(function (response) {
                    model.actuatorsOptions = response.data;
                }).finally(function () {
                    model.loading = false;
                });
            };

            return {
                model: model,
                load: load
            };
        });
