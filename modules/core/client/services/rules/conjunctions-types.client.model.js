'use strict';

angular.module('core')
    .factory('conjunctionsTypes', [function () {

        var model = {
            '&&': 'AND',
            '||': 'OR'
        };

        return {
            model: model
        };
    }]);
