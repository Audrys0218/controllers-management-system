'use strict';

angular.module('core')
    .factory('rulesModel', ['$http',
        function ($http) {
            var model = {
                rules: []
            };

            var load = function () {
                return $http.get('/api/v1/rules').then(function(response){
                    if(response.data.success){
                        model.rules = response.data.data;
                    } else {
                        window.console.log('Unable to pull rules list');
                    }
                });
            };

            var save = function(rule){
                if(rule.id){
                    return $http.put('/api/v1/rules/' + rule.id, rule).then(load);
                } else {
                    return $http.post('/api/v1/rules', rule).then(load);
                }
            };

            var get = function(id){
                return $http.get('/api/v1/rules/' + id);
            };

            return {
                model: model,
                load: load,
                save: save,
                get: get
            };

        }]);
