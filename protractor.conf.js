'use strict';

// Protractor configuration
exports.config = {
    specs: [
        'modules/core/tests/e2e/login.e2e.tests.js',
        'modules/core/tests/e2e/places.e2e.tests.js',
        'modules/core/tests/e2e/microcontrollers.e2e.tests.js',
        'modules/core/tests/e2e/sensors.e2e.tests.js',
        'modules/core/tests/e2e/actuators.e2e.tests.js',
        'modules/core/tests/e2e/rules.e2e.tests.js',
        'modules/core/tests/e2e/remove-left-overs.e2e.tests.js'
    ],
    plugins: [{
        path: 'node_modules/protractor-istanbul-plugin'
    }]
};
