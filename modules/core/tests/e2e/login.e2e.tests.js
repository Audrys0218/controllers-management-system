'use strict';

describe('Login E2E Tests:', function () {
    describe('Login', function () {
        it('login', function () {
            browser.get('http://localhost:3000/authentication/signin');
            element(by.id('username')).sendKeys('admin');
            element(by.id('password')).sendKeys('Admin123456789!');
            element(by.css('button[type="submit"]')).click();
        });
    });
});
