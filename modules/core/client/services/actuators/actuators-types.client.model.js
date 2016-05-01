'use strict';

angular.module('core')
    .factory('actuatorsTypesModel', [function () {

        var model = {
            'light_dimmer': {
                label: 'Light dimmer',
                min: 0,
                max: 100
            },
            'electricity_switcher': {
                label: 'Electricity switcher',
                min: 0,
                max: 1
            }
        };

        return {
            model: model
        };
    }]);
