'use strict';

angular.module('core')
    .factory('placesModel', function ($http, addEditService, confirmation, $q) {

            var model = {
                places: [],
                loading: false
            };

            var load = function () {
                model.loading = true;
                return $http({
                    method: 'GET',
                    url: '/api/v1/places'
                }).then(function (response) {
                    model.places = response.data;
                }).finally(function () {
                    model.loading = false;
                });
            };

            var addEdit = function (placeId) {
                addEditService.open({
                    templateUrl: 'modules/core/client/views/places/place.add-edit.client.view.html',
                    apiUrl: '/api/v1/places/',
                    modelId: placeId,
                    editTitle: 'Edit place',
                    addTitle: 'Add place'
                }).then(load);
            };

            var deletePlace = function (placeId) {
                confirmation.confirm('Warning!', 'Do you really want to delete this item?', function () {
                    $http({
                        method: 'DELETE',
                        url: '/api/v1/places/' + placeId
                    }).then(load);
                });
            };

            var bulkDelete = function () {
                confirmation.confirm('Warning!', 'Do you really want to delete these items?', function () {
                    var promises = [];

                    model.places.forEach(deleteItem)

                    function deleteItem(place) {
                        if (place.isSelected) {
                            promises.push($http({
                                method: 'DELETE',
                                url: '/api/v1/places/' + place.id
                            }));
                        }
                    }

                    $q.all(promises).then(load);
                });
            }

            return {
                model: model,
                load: load,
                addEdit: addEdit,
                delete: deletePlace,
                bulkDelete: bulkDelete
            };

        }
    );
