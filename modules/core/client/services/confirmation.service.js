'use strict';

angular.module('core')
    .service('confirmation', ['$uibModal', function($uibModal){

    this.confirm = function(title, message, callback) {
        var modalInstance = $uibModal.open({
            templateUrl: 'modules/core/client/views/confirmation/confirmation.client.view.html',
            controller: 'ConfirmationController',
            size: 'lg',
            resolve: {
                data: function() {
                    return {
                        title: title,
                        message: message
                    };
                }
            }
        });

        modalInstance.result.then(callback);
    };

}]);
