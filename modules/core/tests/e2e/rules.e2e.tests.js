'use strict';

describe('Rules E2E Tests:', function() {
    describe('Rules', function() {
        it('create', function() {
            var triggers, outcomes;

            browser.get('http://localhost:3000/rules');
            element(by.css('[ng-click="addEdit()"]')).click();
            element(by.model('rule.title')).sendKeys('test');
            element(by.css('[ng-click="addTrigger()"]')).click();
            element(by.css('[ng-click="addOutcome()"]')).click();
            triggers = element.all(by.model('trigger.value'));
            triggers.first().sendKeys('0');
            triggers.get(1).sendKeys('0');
            outcomes = element.all(by.model('outcome.value'));
            outcomes.first().sendKeys('0');
            outcomes.get(1).sendKeys('0');
            element(by.css('[ng-click="save()"]')).click();

            browser.sleep(1000);
        });

        it('edit', function() {
            element.all(by.css('[ng-click="addEdit(rule.id)"]')).first().click();
            element(by.model('rule.title')).sendKeys('edited');
            element(by.css('[ng-click="save()"]')).click();

            expect(element.all((by.css('[ng-click="addEdit(rule.id)"]'))).first().getText()).toEqual('testedited');
        });

        it('delete', function() {
            element.all(by.css('[ng-click="delete(rule.id)"]')).first().click();
            element.all(by.css('[ng-click="ok()"]')).click();

            expect(element.all(by.repeater('rule in rulesModel.rules | orderBy: [\'-enabled\', \'-priority\'] | filter: searchText')).count()).toBe(0);
        });
    });
});
