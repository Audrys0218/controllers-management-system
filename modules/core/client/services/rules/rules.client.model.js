'use strict';

angular.module('core')
    .factory('rulesModel',
        function ($http, confirmation, $q) {
            var model = {
                rules: [],
                defaultRuleObject: {
                    title: '',
                    type: '&&',
                    priority: 0,
                    triggers: [{}],
                    outcomes: [{}],
                    enabled: true
                },
                loading: false
            };

            var load = function () {
                model.loading = true;
                return $http.get('/api/v1/rules').then(function (response) {
                    model.rules = response.data;
                }).finally(function(){
                    model.loading = false;
                });
            };

            var save = function (rule) {
                if (rule.id) {
                    return $http.put('/api/v1/rules/' + rule.id, rule).then(load);
                } else {
                    return $http.post('/api/v1/rules', rule).then(load);
                }
            };

            var get = function (id) {
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

            var bulkDelete = function () {
                confirmation.confirm('Warning!', 'Do you really want to delete these items?', function () {
                    var promises = [];

                    model.rules.forEach(deleteItem);

                    function deleteItem(rule) {
                        if (rule.isSelected) {
                            promises.push($http({
                                method: 'DELETE',
                                url: '/api/v1/rules/' + rule.id
                            }));
                        }
                    }

                    $q.all(promises).then(load);
                });
            };

            return {
                model: model,
                load: load,
                save: save,
                get: get,
                delete: deleteRule,
                bulkDelete: bulkDelete
            };

        });
