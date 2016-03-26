'use strict';

describe('Places E2E Tests:', function () {
    describe('Places', function () {
        var startCount;

        beforeEach(function () {
            browser.get('http://localhost:3000/places');
            element.all(by.repeater('place in model.places')).count().then(function (originalCount) {
                startCount = originalCount;
            });
        });

        it('create place', function () {
            element(by.css('button[ng-click="addEdit()"]')).click();
            element(by.id('title')).sendKeys('test');
            element(by.css('button[ng-click="save()"]')).click();

            expect(element.all(by.repeater('place in model.places')).count()).toBe(startCount + 1);
        });

        it('update place', function () {
            element.all(by.css('button[ng-click="addEdit(place.id)"]')).first().click();

            element(by.id('title')).clear().sendKeys('test2');
            element(by.css('button[ng-click="save()"]')).click();

            expect(element.all(by.repeater('place in model.places')).count()).toBe(startCount);
            element.all(by.css("table tr:nth-of-type(2) td:first-of-type")).first().getText().then(function (text) {
                expect(text).toBe('test2');
            });
        });

        it('delete place', function () {
            element.all(by.css('button[ng-click="delete(place.id)"]')).first().click();
            element.all(by.css('button[ng-click="ok()"]')).first().click();

            expect(element.all(by.repeater('place in model.places')).count()).toBe(startCount - 1);
        });
    });
});
