'use strict';

(function() {
    describe('sensorsModel', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('addEditService', jasmine.createSpyObj('addEditService', ['open']));
            _$provide_.value('$http', jasmine.createSpyObj('$http', ['get', 'delete']));
            _$provide_.value('microcontrollersModel', jasmine.createSpyObj('microcontrollersModel', ['load']));
        }));

        var sensorsModel,
            $q,
            $http;

        beforeEach(inject(function(_sensorsModel_, _$q_, _$http_) {
            sensorsModel = _sensorsModel_;
            $q = _$q_;
            $http = _$http_;
        }));

        it('bulkDeleteDisabled - should return true if all sensors is not selected', function(){
            sensorsModel.model.sensors = [
                {isSelected: false},
                {isSelected: false}
            ];
            $http.delete.and.returnValue($q.resolve());

            var result = sensorsModel.bulkDeleteDisabled();

            expect(result).toBe(true);
        });

        it('bulkDeleteDisabled - should return false if one sensor selected', function(){
            sensorsModel.model.sensors = [
                {isSelected: false},
                {isSelected: true}
            ];
            $http.delete.and.returnValue($q.resolve());

            var result = sensorsModel.bulkDeleteDisabled();

            expect(result).toBe(false);
        });

        it('addEdit - should use addEditService', inject(function(addEditService, microcontrollersModel, $http, $rootScope){
            var deffered = $q.defer();
            addEditService.open.and.returnValue($q.resolve());
            $http.get.and.returnValue($q.resolve([]));
            microcontrollersModel.load.and.returnValue(deffered.promise);
            microcontrollersModel.model = {microcontrollersModel: []};

            sensorsModel.addEdit();
            deffered.resolve();
            $rootScope.$digest();

            expect(addEditService.open).toHaveBeenCalled();
        }));

        it('load - make request to server for data', inject(function($http){
            $http.get.and.returnValue($q.resolve());

            sensorsModel.load();

            expect($http.get).toHaveBeenCalledWith('/api/v1/sensors');
        }));

        it('delete - should make request to server for delete', inject(function($http){
            $http.delete.and.returnValue($q.resolve());

            sensorsModel.delete(5);

            expect($http.delete).toHaveBeenCalledWith('/api/v1/sensors/5');
        }));

        it('bulkDelete - should make multiple request to server for delete', inject(function($http){
            sensorsModel.model.sensors = [
                {id: 1, isSelected: true},
                {id: 2, isSelected: true}
            ];
            $http.delete.and.returnValue($q.resolve());

            sensorsModel.bulkDelete(5);

            expect($http.delete.calls.argsFor(0)).toEqual(['/api/v1/sensors/1']);
            expect($http.delete.calls.argsFor(1)).toEqual( ['/api/v1/sensors/2']);
        }));
    });
}());
