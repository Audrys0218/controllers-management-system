'use strict';

angular.module('core')
    .factory('ruleDefaultModel', [function () {

        var model = {
            rule: {
                title: '',
                type: '&&',
                triggers: [{}],
                outcomes: [{}]
            }
        };

        return {
            model: model
        };
    }]);
