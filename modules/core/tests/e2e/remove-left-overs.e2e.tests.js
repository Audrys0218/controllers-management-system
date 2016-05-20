'use strict';

describe('Remove left overs E2E Tests:', function() {
    describe('', function() {
        it('delete actuator', function() {
            browser.get('http://localhost:3000/actuators');
            element.all(by.css('[ng-click="delete(actuator.id)"]')).first().click();
            element.all(by.css('[ng-click="ok()"]')).click();

            expect(element.all(by.repeater('actuator in actuatorsModel.actuators | filter: searchText')).count()).toBe(0);
        });

        it('delete sensor', function() {
            browser.get('http://localhost:3000/sensors');
            element.all(by.css('[ng-click="delete(sensor.id)"]')).first().click();
            element.all(by.css('[ng-click="ok()"]')).click();

            expect(element.all(by.repeater('sensor in sensorsModel.sensors | filter: searchText')).count()).toBe(0);
        });


        it('delete microcontroller', function() {
            browser.get('http://localhost:3000/microcontrollers');
            element.all(by.css('[ng-click="delete(microcontroller.id)"]')).first().click();
            element.all(by.css('[ng-click="ok()"]')).click();

            expect(element.all(by.repeater('microcontroller in microcontrollersModel.microcontrollers | filter: searchText')).count()).toBe(0);
        });

        it('delete place', function() {
            browser.get('http://localhost:3000/places');
            element.all(by.css('[ng-click="delete(place.id)"]')).first().click();
            element.all(by.css('[ng-click="ok()"]')).click();

            expect(element.all(by.repeater('place in model.places | filter:{title: searchText} track by place.id')).count()).toBe(0);
        });
    });
});
