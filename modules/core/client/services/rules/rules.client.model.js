'use strict';

angular.module('core')
    .factory('rulesModel', ['$http',
        function ($http) {
            var model = {
                rule: {
                    triggers: [{}],
                    triggersOutcomes: [{}]
                }
            };

            var load = function () {
                model.rule = {
                    id: '1',
                    'title': 'Title1',
                    triggers: [{
                        sensorId: null,
                        operator: '>',
                        value: '25'

                    }, {
                        sensorId: null,
                        operator: '>',
                        value: '25'

                    }],
                    triggersOutcomes: [{
                        controllerId: null,
                        value: '25'

                    }, {
                        controllerId: null,
                        value: '25'

                    }]
                };
            };

            return {
                model: model,
                load: load
            };

        }]);
