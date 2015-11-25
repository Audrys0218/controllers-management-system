'use strict';

angular.module('core')
    .factory('operatorsModel', [function () {

        var model = {
            '>': '>',
            '>=': '>=',
            '=': '=',
            '<': '<',
            '<=': '<='
        };

        return {
            model: model
        };
    }]);
