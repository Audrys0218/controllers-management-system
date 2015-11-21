'use strict';

angular.module('core')
    .service('addEditService', ['$modal', '$q', function ($modal, $q) {

        this.open = function (data) {
            var deferred = $q.defer();
            var modalInstance = $modal.open({
                templateUrl: data.templateUrl,
                controller: 'AddEditController',
                size: 'lg',
                resolve: {
                    data: function () {
                        return {
                            apiUrl: data.apiUrl,
                            model: data.model,
                            title: data.model ? data.editTitle : data.addTitle
                        };
                    }
                }
            });

            modalInstance.result.then(function (data) {
                deferred.resolve({
                    data: data
                });
            });

            return deferred.promise;
        };

    }]);
