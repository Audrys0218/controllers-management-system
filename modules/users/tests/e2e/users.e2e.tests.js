'use strict';

describe('Users E2E Tests:', function () {
    describe('Not authenticated user', function () {
        it('Should login', function () {

            browser.get('http://localhost:3000');

            element(by.id('username')).sendKeys('test');
            element(by.id('password')).sendKeys('#Test123456');
            element(by.css('button[type=submit]')).click();
            //element(by.binding('error')).getText().then(function (errorText) {
            //  expect(errorText).toBe('Invalid username or password');
            //});
        });
    });
});
