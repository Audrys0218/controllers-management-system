'use strict';

describe('Places E2E Tests:', function() {
    describe('Places', function() {
        it('create', function() {
            browser.get('http://localhost:3000/places');
            element(by.css('[ng-click="addEdit()"]')).click();
            element(by.model('model.title')).sendKeys('test');
            element(by.css('[ng-click="save()"]')).click();

            browser.sleep(1000);

            element(by.css('[ng-click="addEdit()"]')).click();
            element(by.model('model.title')).sendKeys('test2');
            element(by.css('[ng-click="save()"]')).click();

            expect(element.all(by.repeater('place in model.places | filter:{title: searchText} track by place.id')).count()).toBe(2);
        });

        it('edit', function() {
            element.all(by.css('[ng-click="addEdit(place.id)"]')).first().click();
            element(by.model('model.title')).sendKeys('edited');
            element(by.css('[ng-click="save()"]')).click();

            expect(element.all((by.css('[ng-click="addEdit(place.id)"]'))).first().getText()).toEqual('test2edited');

        });

        it('delete', function() {
            element.all(by.css('[ng-click="delete(place.id)"]')).first().click();
            element.all(by.css('[ng-click="ok()"]')).click();

            expect(element.all(by.repeater('place in model.places | filter:{title: searchText} track by place.id')).count()).toBe(1);
        });
    });
});
