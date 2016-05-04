'use strict';

(function() {
    describe('placesModel', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('addEditService', jasmine.createSpyObj('addEditService', ['open']));
            _$provide_.value('$http', jasmine.createSpyObj('$http', ['get', 'delete']));
        }));

        var placesModel,
            $q;

        beforeEach(inject(function(_placesModel_, _$q_) {
            placesModel = _placesModel_;
            $q = _$q_;
        }));

        it('bulkDeleteDisabled - should return true if all places is not selected', function(){
            placesModel.model.places = [
                {isSelected: false},
                {isSelected: false}
            ];

            var result = placesModel.bulkDeleteDisabled();

            expect(result).toBe(true);
        });

        it('bulkDeleteDisabled - should return false if one place selected', function(){
            placesModel.model.places = [
                {isSelected: false},
                {isSelected: true}
            ];

            var result = placesModel.bulkDeleteDisabled();

            expect(result).toBe(false);
        });

        it('addEdit - should use addEditService', inject(function(addEditService){
            addEditService.open.and.returnValue($q.resolve());

            placesModel.addEdit();

            expect(addEditService.open).toHaveBeenCalled();
        }));

        it('load - make request to server for data', inject(function($http){
            $http.get.and.returnValue($q.resolve());

            placesModel.load();

            expect($http.get).toHaveBeenCalledWith('/api/v1/places');
        }));

        it('delete - should make request to server for delete', inject(function($http){
            $http.delete.and.returnValue($q.resolve());

            placesModel.delete(5);

            expect($http.delete).toHaveBeenCalledWith('/api/v1/places/5');
        }));

        it('bulkDelete - should make multiple request to server for delete', inject(function($http){
            placesModel.model.places = [
                {id: 1, isSelected: true},
                {id: 2, isSelected: true}
            ];
            $http.delete.and.returnValue($q.resolve());

            placesModel.bulkDelete(5);

            expect($http.delete.calls.argsFor(0)).toEqual(['/api/v1/places/1']);
            expect($http.delete.calls.argsFor(1)).toEqual( ['/api/v1/places/2']);
        }));
    });
}());
