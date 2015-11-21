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
            }).then(successCallback);

            function successCallback(response) {
                if (response.data.success) {
                    model.places = response.data.data;
                } else {
                    window.console.log('Error:' + response.data.message);
                }
            }
        };

        var addEdit = function (place) {
            addEditService.open({
                templateUrl: 'modules/core/client/views/places/place.add-edit.client.view.html',
                apiUrl: '/api/v1/places/',
                model: place,
                editTitle: 'Edit place',
                addTitle: 'Add place'
            }).then(addOrEdit);

            function addOrEdit(response) {
                var elementIndex = model.places.map(function (p) {
                    return p._id;
                }).indexOf(response.data._id);

                if (elementIndex > -1) {
                    model.places[elementIndex] = response.data;
                } else {
                    model.places.push(response.data);
                }
            }
        };

        var deletePlace = function (place) {
            confirmation.confirm('Warning!', 'Do you really want to delete this item?', function () {
                $http({
                    method: 'DELETE',
                    url: '/api/v1/places/' + place._id
                }).then(function (response) {
                    var index = model.places.indexOf(place);
                    if(response.data.success){
                        model.places.splice(index, 1);
                    }
                });
            });
        };

        return {
            model: model,
            load: load,
            addEdit: addEdit,
            delete: deletePlace
        };

    }]);
