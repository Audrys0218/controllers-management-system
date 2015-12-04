'use strict';

describe('Rules E2E Tests:', function () {
    describe('Rules', function () {
        var startCount;

        beforeEach(function () {
            browser.get('http://localhost:3000/rules');
            element.all(by.repeater('rule in model.rules')).count().then(function (originalCount) {
                startCount = originalCount;
            });
        });

        it('add rule', function () {
            element.all(by.css('button[ng-click="addEdit()"]')).first().click();

            element(by.id('title')).sendKeys('test');
            element(by.id('priority')).sendKeys('999');
            element(by.css('select[ng-model="trigger.sensor"] option:nth-child(2)')).click();
            element(by.css('select[ng-model="trigger.compareType"] option:nth-child(2)')).click();
            element(by.css('input[ng-model="trigger.value"]')).sendKeys('0');
            element(by.css('select[ng-model="outcome.controller"] option:nth-child(2)')).click();
            element(by.css('input[ng-model="outcome.value"]')).sendKeys('0');
            element(by.css('button[ng-click="save()"]')).click();

            expect(element.all(by.repeater('rule in model.rules')).count()).toBe(startCount + 1);
        });

        it('update rule', function () {
            element.all(by.css('button[ng-click="addEdit(rule.id)"]')).first().click();

            element(by.id('title')).clear().sendKeys('test2');
            element(by.css('button[ng-click="save()"]')).click();

            expect(element.all(by.repeater('rule in model.rules')).count()).toBe(startCount);
            element.all(by.css("td.rule-title")).first().getText().then(function (text) {
                expect(text).toBe('test2');
            });
        });

        it('delete rule', function () {
            element.all(by.css('button[ng-click="delete(rule.id)"]')).first().click();
            element(by.css('button[ng-click="ok()"]')).click();

            expect(element.all(by.repeater('rule in model.rules')).count()).toBe(startCount - 1);
        });
    });
});
