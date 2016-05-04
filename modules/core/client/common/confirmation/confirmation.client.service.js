'use strict';

angular.module('common')
    .service('confirmation', ['$uibModal', function ($uibModal) {

        this.confirm = function (title, message, callback) {
            $uibModal.open({
                templateUrl: 'modules/core/client/common/confirmation/confirmation.client.view.html',
                controller: 'ConfirmationController',
                resolve: {
                    data: function () {
                        return {
                            title: title,
                            message: message
                        };
                    }
                }
            }).result.then(callback);
        };

    }]);
