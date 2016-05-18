'use strict';

describe('Places E2E Tests:', function() {
    describe('Places', function() {
        it('create', function() {

            browser.get('http://localhost:3000/places');
            element(by.css('[ng-click="addEdit()"]')).click();
            element(by.model('model.title')).sendKeys('test');
            element(by.css('[ng-click="save()"]')).click();

            expect(element.all(by.repeater('place in model.places | filter:{title: searchText} track by place.id')).count()).toBe(1);
        });

        it('edit', function() {
            element(by.css('[ng-click="addEdit(place.id)"]')).click();
            element(by.model('model.title')).sendKeys('test-edited');
            element(by.css('[ng-click="save()"]')).click();

            expect(element(by.css('[ng-repeat^="place in model.places"]:nth(0) button:nth(0)')).getText()).toEqual('test-edited');

        });

        it('delete', function() {
            element.all(by.css('[ng-click="delete(place.id)"]')).first().click();
            element.all(by.css('[ng-click="ok()"]')).click();

            expect(element.all(by.repeater('place in model.places | filter:{title: searchText} track by place.id')).count()).toBe(0);
        });
    });
});
