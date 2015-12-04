'use strict';

describe('controllers E2E Tests:', function () {
    describe('controllers', function () {
        var startCount;

        beforeEach(function () {
            browser.get('http://localhost:3000/controllers');
            element.all(by.repeater('controller in model.controllers')).count().then(function (originalCount) {
                startCount = originalCount;
            });
        });

        it('add controller', function () {
            element.all(by.css('button[ng-click="addEdit()"]')).first().click();

            element(by.id('title')).sendKeys('test');
            element(by.css('select[ng-model="model.place"] option:nth-child(2)')).click();
            element(by.css('select[ng-model="model.type"] option:nth-child(2)')).click();
            element(by.css('select[ng-model="model.communicationType"] option:nth-child(2)')).click();
            element(by.css('.modal-footer button[ng-click="save()"]')).click();

            expect(element.all(by.repeater('controller in model.controllers')).count()).toBe(startCount + 1);
        });

        it('update controller', function () {
            element.all(by.css('button[ng-click="addEdit(controller.id)"]')).first().click();

            element(by.id('title')).clear().sendKeys('test2');
            element(by.css('.modal-footer button[ng-click="save()"]')).click();

            expect(element.all(by.repeater('controller in model.controllers')).count()).toBe(startCount);
            element.all(by.css("td.controller-title")).first().getText().then(function (text) {
                expect(text).toBe('test2');
            });
        });

        it('delete controller', function () {
            element.all(by.css('button[ng-click="delete(controller.id)"]')).first().click();
            element(by.css('button[ng-click="ok()"]')).click();

            expect(element.all(by.repeater('controller in model.controllers')).count()).toBe(startCount - 1);
        });
    });
});
