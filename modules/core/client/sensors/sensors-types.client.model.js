'use strict';

angular.module('core')
    .factory('sensorsTypesModel', [function () {

        var model = {
            'button': {
                label: 'Button',
                min: 0,
                max: 1
            },
            'temperature': {
                label: 'Temperature',
                min: 0,
                max: 100
            },
            'sound': {
                label: 'Sound',
                min: 0,
                max: 1000
            },
            'smoke': {
                label: 'Smoke',
                min: 0,
                max: 1
            }
        };

        return {
            model: model
        };
    }]);
