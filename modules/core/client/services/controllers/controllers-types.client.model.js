'use strict';

angular.module('core')
    .factory('controllersTypesModel', [function () {

        var model = {
            'light_dimmer_colorful': 'Light dimmer (colorful)',
            'light_dimmer': 'Light dimmer',
            'electricity_switcher': 'Electricity switcher',
            'audio': 'Audio',
            'tv': 'TV',
            'window': 'Window',
            'oven': 'Oven',
            'doors': 'Doors',
            'temperature': 'Temperature',
            'alarm': 'Alarm'
        };

        return {
            model: model
        };
    }]);
