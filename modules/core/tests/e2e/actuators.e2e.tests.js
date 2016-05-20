'use strict';

describe('Sensors E2E Tests:', function() {
    describe('Sensors', function() {
        it('create', function() {
            browser.get('http://localhost:3000/actuators');
            element(by.css('[ng-click="addEdit()"]')).click();
            element(by.model('model.title')).sendKeys('test');
            element.all(by.options('microcontroller.id as microcontroller.title group by microcontroller.placeTitle for microcontroller in dataModel.microcontrollers')).get(1).click();
            element.all(by.options('key as value.label for (key , value) in dataModel.controllersTypes')).get(1).click();
            element(by.model('model.pinNumber')).sendKeys('GPIO14');
            element(by.css('[ng-click="save()"]')).click();

            browser.sleep(1000);

            element(by.css('[ng-click="addEdit()"]')).click();
            element(by.model('model.title')).sendKeys('test2');
            element.all(by.options('microcontroller.id as microcontroller.title group by microcontroller.placeTitle for microcontroller in dataModel.microcontrollers')).get(1).click();
            element.all(by.options('key as value.label for (key , value) in dataModel.controllersTypes')).get(1).click();
            element(by.model('model.pinNumber')).sendKeys('GPIO14');
            element(by.css('[ng-click="save()"]')).click();

            expect(element.all(by.repeater('actuator in actuatorsModel.actuators | filter: searchText')).count()).toBe(2);
        });

        it('edit', function() {
            element.all(by.css('[ng-click="addEdit(actuator.id)"]')).first().click();
            element(by.model('model.title')).sendKeys('edited');
            element(by.css('[ng-click="save()"]')).click();

            expect(element.all((by.css('[ng-click="addEdit(actuator.id)"]'))).first().getText()).toEqual('test2edited');
        });

        it('delete', function() {
            element.all(by.css('[ng-click="delete(actuator.id)"]')).first().click();
            element.all(by.css('[ng-click="ok()"]')).click();

            expect(element.all(by.repeater('actuator in actuatorsModel.actuators | filter: searchText')).count()).toBe(1);
        });
    });
});
