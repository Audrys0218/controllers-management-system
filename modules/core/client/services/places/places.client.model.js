'use strict';

angular.module('core')
    .factory('placesModel', ['$http', 'addEditService', 'confirmation', function ($http, addEditService, confirmation) {

        var model = {
            places: []
        };

        var load = function () {
            return $http({
                method: 'GET',
                url: '/api/v1/places'
            }).then(function (response) {
                model.places = response.data;
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

        return {
            model: model,
            load: load,
            addEdit: addEdit,
            delete: deletePlace
        };

    }]);
