'use strict';

(function() {
  describe('httpInterceptor', function() {
    //Initialize global variables
    var httpInterceptor,
    $q,
    $state,
    httpProvider;

    // Load the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    //Load httpProvider
    beforeEach(module(function($httpProvider) {
      httpProvider = $httpProvider;
    }));

    beforeEach(inject(function(_authInterceptor_, _$q_, _$state_) {
      httpInterceptor = _authInterceptor_;
      $q = _$q_;
      $state = _$state_;
      spyOn($q,'reject');
      spyOn($state,'transitionTo');
    }));

    it('Auth Interceptor should be object', function() {
      expect( typeof httpInterceptor).toEqual('object');
    });

    it('Auth Interceptor should contain responseError function', function() {
      expect( typeof httpInterceptor.responseError).toEqual('function');
    });

    it('httpProvider Interceptor should have httpInterceptor', function() {
      expect(httpProvider.interceptors).toContain('httpInterceptor');
    });

    describe('Forbidden Interceptor', function() {
      it('should redirect to forbidden route', function () {
          var response = {status:403,config:{}};
          var promise = httpInterceptor.responseError(response);
          expect($q.reject).toHaveBeenCalled();
          expect($state.transitionTo).toHaveBeenCalledWith('forbidden');
      });
    });

    describe('Authorization Interceptor', function() {
      it('should redirect to signIn page for unauthorized access', function () {
          var response = {status:401,config:{}};
          var promise = httpInterceptor.responseError(response);
          expect($q.reject).toHaveBeenCalled();
          expect($state.transitionTo).toHaveBeenCalledWith('authentication.signin');
      });
    });
  });
})();
