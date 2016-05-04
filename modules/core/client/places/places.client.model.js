'use strict';

angular.module('core')
    .factory('placesModel', function($http, $q, addEditService) {

            var model = {
                places: [],
                loading: false
            };

            var load = function() {
                model.loading = true;
                return $http.get('/api/v1/places').then(function(response) {
                    model.places = response.data;
                }).finally(function() {
                    model.loading = false;
                });
            };

            var addEdit = function(placeId) {
                addEditService.open({
                    templateUrl: 'modules/core/client/places/place.add-edit.client.view.html',
                    apiUrl: '/api/v1/places/',
                    modelId: placeId,
                    editTitle: 'Edit place',
                    addTitle: 'Add place'
                }).then(load);
            };

            var deletePlace = function(placeId) {
                $http.delete('/api/v1/places/' + placeId).then(load);
            };

            var bulkDelete = function() {
                var promises = [];

                model.places.forEach(deleteItem);

                function deleteItem(place) {
                    if (place.isSelected) {
                        promises.push($http.delete('/api/v1/places/' + place.id));
                    }
                }

                $q.all(promises).then(load);
            };

            var bulkDeleteDisabled = function() {
                return !model.places.some(function(place) {
                    return place.isSelected;
                });
            };

            return {
                model: model,
                load: load,
                addEdit: addEdit,
                delete: deletePlace,
                bulkDelete: bulkDelete,
                bulkDeleteDisabled: bulkDeleteDisabled
            };

        }
    );
