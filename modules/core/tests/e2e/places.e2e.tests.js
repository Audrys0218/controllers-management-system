'use strict';

describe('Places E2E Tests:', function () {
    describe('Places', function () {
        var startCount;

        beforeEach(function () {
            browser.get('http://localhost:3000/places');
            element.all(by.repeater('places in model.places')).count().then(function (originalCount) {
                startCount = originalCount;
            });
        });

        it('Create place', function () {
            element(by.css('button[ng-click="addEdit()"]')).click();
            element(by.id('title')).sendKeys('test');
            element(by.css('button[ng-click="save()"]')).click();

            expect(element.all(by.repeater('places in model.places')).count()).toBe(startCount + 1);
        });
    });
});
