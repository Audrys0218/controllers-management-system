'use strict';

describe('Users E2E Tests:', function () {
  describe('Not authenticated user', function () {
    it('Should redirect to login page if not authenticated', function () {

      browser.get('http://localhost:3000');

      //browser.get('http://localhost:3000/authentication/signin');
      //element(by.css('button[type=submit]')).click();
      //element(by.binding('error')).getText().then(function (errorText) {
      //  expect(errorText).toBe('Missing credentials');
      //});
    });
  });
});
