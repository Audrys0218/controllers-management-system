'use strict';

describe('Sensors E2E Tests:', function () {
    describe('Sensors', function () {
        var startCount;

        beforeEach(function () {
            browser.get('http://localhost:3000/sensors');
            element.all(by.repeater('sensor in model.sensors')).count().then(function (originalCount) {
                startCount = originalCount;
            });
        });

        it('add sensor', function () {
            element(by.css('button[ng-click="addEdit()"]')).click();

            element(by.id('title')).sendKeys('test');
            element(by.css('select[ng-model="model.place"] option:nth-child(2)')).click();
            element(by.css('select[ng-model="model.type"] option:nth-child(2)')).click();
            element(by.css('select[ng-model="model.communicationType"] option:nth-child(2)')).click();
            element(by.css('button[ng-click="save()"]')).click();

            expect(element.all(by.repeater('sensor in model.sensors')).count()).toBe(startCount + 1);
        });

        it('delete sensor', function () {
            element(by.css('button[ng-click="delete(sensor.id)"]')).click();
            element(by.css('button[ng-click="ok()"]')).click();

            expect(element.all(by.repeater('sensor in model.sensors')).count()).toBe(startCount - 1);
        });
    });
});
