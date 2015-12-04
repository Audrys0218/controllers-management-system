//'use strict';
//
//describe('Sensors E2E Tests:', function () {
//    describe('Sensors', function () {
//        var startCount;
//
//        beforeEach(function () {
//            browser.get('http://localhost:3000/sensors');
//            element.all(by.repeater('sensor in model.sensors')).count().then(function (originalCount) {
//                startCount = originalCount;
//            });
//        });
//
//        it('add sensor', function () {
//            element.all(by.css('button[ng-click="addEdit()"]')).first().click();
//
//            element(by.id('title')).sendKeys('test');
//            element(by.css('select[ng-model="model.place"] option:nth-child(2)')).click();
//            element(by.css('select[ng-model="model.type"] option:nth-child(2)')).click();
//            element(by.css('select[ng-model="model.communicationType"] option:nth-child(2)')).click();
//            element(by.css('button[ng-click="save()"]')).click();
//
//            expect(element.all(by.repeater('sensor in model.sensors')).count()).toBe(startCount + 1);
//        });
//
//        it('update sensor', function () {
//            element.all(by.css('button[ng-click="addEdit(sensor.id)"]')).first().click();
//
//            element(by.id('title')).clear().sendKeys('test2');
//            element(by.css('button[ng-click="save()"]')).click();
//
//            expect(element.all(by.repeater('sensor in model.sensors')).count()).toBe(startCount);
//            element.all(by.css("td.sensor-title")).first().getText().then(function (text) {
//                expect(text).toBe('test2');
//            });
//        });
//
//        it('delete sensor', function () {
//            element.all(by.css('button[ng-click="delete(sensor.id)"]')).first().click();
//            element(by.css('button[ng-click="ok()"]')).click();
//
//            expect(element.all(by.repeater('sensor in model.sensors')).count()).toBe(startCount - 1);
//        });
//    });
//});
