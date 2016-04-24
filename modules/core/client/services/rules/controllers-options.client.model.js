'use strict';

angular.module('core')
    .factory('controllersOptionsModel',
        function ($http) {
            var model = {
                controllersOptions: [],
                loading: false
            };

            var load = function () {
                model.loading = true;
                return $http.get('/api/v1/rules/controllers-options').then(function (response) {
                    model.controllersOptions = response.data;
                }).finally(function () {
                    model.loading = false;
                });
            };


            return {
                model: model,
                load: load
            };
        });
