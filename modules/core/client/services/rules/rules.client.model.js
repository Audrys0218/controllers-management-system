'use strict';

angular.module('core')
    .factory('rulesModel', ['$http',
        function ($http) {
            var model = {
                rule: {
                    triggers: [{}],
                    outcomes: [{}]
                }
            };

            var load = function () {
                model.rule = {
                    id: '1',
                    'title': 'Title1',
                    triggers: [{
                        sensor: null,
                        compareType: '>',
                        value: '25'

                    }, {
                        sensor: null,
                        compareType: '>',
                        value: '25'

                    }],
                    outcomes: [{
                        controller: null,
                        value: '25'

                    }, {
                        controller: null,
                        value: '25'

                    }]
                };
            };

            return {
                model: model,
                load: load
            };

        }]);
