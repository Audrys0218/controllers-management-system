'use strict';

angular.module('core')
    .factory('pingService', ['$http', function ($http) {

        var model = {
            loading: false,
            isAlive: false
        };

        var ping = function (ip) {
            model.loading = true;
            return $http.post('api/v1/microcontroller/ping', {ip: ip}).then(function (response) {
                    model.isAlive = response.data.isAlive;
                })
                .finally(function () {
                    model.loading = false;
                });
        };

        return {
            model: model,
            ping: ping
        };
    }]);
