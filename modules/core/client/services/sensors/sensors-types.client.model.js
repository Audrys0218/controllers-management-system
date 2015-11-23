'use strict';

angular.module('core')
    .factory('sensorsTypesModel', [function () {

        var model = {
            'light': 'Light',
            'motion': 'Motion',
            'temperature': 'Temperature',
            'humidity': 'Humidity',
            'sound': 'Sound',
            'smoke': 'Smoke'
        };

        return {
            model: model
        };
    }]);
