'use strict';

angular.module('core')
    .factory('pingService', ['$http', function ($http, $q) {

        var ping = function (url) {
            var deferred = $q.defer();

            $http.get(url).then(function (response) {
                return deferred.resolve(response.status === 200);
            });

            return deferred.promise;
        };

        return {
            ping: ping
        };

    }]);
