'use strict';

angular.module('core').factory('httpInterceptor', ['$q', '$injector', 'alertService',
  function ($q, $injector, alertService) {
    return {
      responseError: function(rejection) {
        switch (rejection.status) {
          case 400:
            angular.forEach(rejection.data.errors, function(error) {
              alertService.showError(error.message);
            });
            break;
          case 401:
            $injector.get('$state').transitionTo('authentication.signin');
            break;
          case 403:
            $injector.get('$state').transitionTo('forbidden');
            break;
        }
        // otherwise, default behaviour
        return $q.reject(rejection);
      }
    };
  }
]);
