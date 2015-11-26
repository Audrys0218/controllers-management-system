'use strict';

angular.module('core')
    .factory('rulesModel', ['$http', 'confirmation',
        function ($http, confirmation) {
            var model = {
                rules: [],
                defaultRuleObject: {
                    title: '',
                    type: '&&',
                    triggers: [{}],
                    outcomes: [{}]
                }
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

            var deleteRule = function (ruleId) {
                confirmation.confirm('Warning!', 'Do you really want to delete this item?', function () {
                    $http({
                        method: 'DELETE',
                        url: '/api/v1/rules/' + ruleId
                    }).then(load);
                });
            };

            return {
                model: model,
                load: load,
                save: save,
                get: get,
                delete: deleteRule
            };

        }]);
