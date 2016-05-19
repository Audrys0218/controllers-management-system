'use strict';

describe('Microcontroller E2E Tests:', function() {
    describe('Microcontroller', function() {
        it('create', function() {
            browser.get('http://localhost:3000/microcontrollers');
            element(by.css('[ng-click="addEdit()"]')).click();
            element(by.model('microcontroller.title')).sendKeys('test');
            element(by.css('select option:nth-child(2)')).click();
            element(by.model('microcontroller.ip')).sendKeys('192.168.0.5');
            element(by.css('[ng-click="save()"]')).click();

            browser.sleep(1000);

            element(by.css('[ng-click="addEdit()"]')).click();
            element(by.model('microcontroller.title')).sendKeys('test2');
            element(by.css('select option:nth-child(2)')).click();
            element(by.model('microcontroller.ip')).sendKeys('192.168.0.5');
            element(by.css('[ng-click="save()"]')).click();

            expect(element.all(by.repeater('microcontroller in microcontrollersModel.microcontrollers | filter: searchText')).count()).toBe(2);
        });

        it('edit', function() {
            element.all(by.css('[ng-click="addEdit(microcontroller.id)"]')).first().click();
            element(by.model('microcontroller.title')).sendKeys('edited');
            element(by.css('[ng-click="save()"]')).click();

            expect(element.all((by.css('[ng-click="addEdit(microcontroller.id)"]'))).first().getText()).toEqual('testedited');

        });

        it('delete', function() {
            element.all(by.css('[ng-click="delete(microcontroller.id)"]')).first().click();
            element.all(by.css('[ng-click="ok()"]')).click();

            expect(element.all(by.repeater('microcontroller in microcontrollersModel.microcontrollers | filter: searchText')).count()).toBe(1);
        });
    });
});
