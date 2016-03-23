'use strict';

angular.module('core')
    .service('addEditService', ['$uibModal', '$q', function ($uibModal, $q) {
        this.open = function (data) {
            var deferred = $q.defer(),
                modalInstance = $uibModal.open({
                    templateUrl: data.templateUrl,
                    controller: 'AddEditController',
                    size: 'lg',
                    resolve: {
                        data: function () {
                            return {
                                apiUrl: data.apiUrl,
                                modelId: data.modelId,
                                title: data.model ? data.editTitle : data.addTitle,
                                dataModel: data.dataModel
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
