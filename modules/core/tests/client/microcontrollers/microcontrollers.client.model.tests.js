'use strict';

(function() {
    describe('microcontrollersModel', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('$http', jasmine.createSpyObj('$http', ['get', 'delete', 'post', 'put']));
        }));

        var microcontrollersModel,
            $q,
            $http;

        beforeEach(inject(function(_microcontrollersModel_, _$q_, _$http_) {
            microcontrollersModel = _microcontrollersModel_;
            $q = _$q_;
            $http = _$http_;
        }));

        it('bulkDeleteDisabled - should return true if all sensors is not selected', function(){
            microcontrollersModel.model.microcontrollers = [
                {isSelected: false},
                {isSelected: false}
            ];
            $http.delete.and.returnValue($q.resolve());

            var result = microcontrollersModel.bulkDeleteDisabled();

            expect(result).toBe(true);
        });

        it('bulkDeleteDisabled - should return false if one sensor selected', function(){
            microcontrollersModel.model.microcontrollers = [
                {isSelected: false},
                {isSelected: true}
            ];
            $http.delete.and.returnValue($q.resolve());

            var result = microcontrollersModel.bulkDeleteDisabled();

            expect(result).toBe(false);
        });

        it('load - make request to server for data', inject(function($http){
            $http.get.and.returnValue($q.resolve());

            microcontrollersModel.load();

            expect($http.get).toHaveBeenCalledWith('/api/v1/microcontroller');
        }));

        it('save - should make post request to api', inject(function($http){
            $http.post.and.returnValue($q.resolve());

            microcontrollersModel.save({});

            expect($http.post).toHaveBeenCalledWith('/api/v1/microcontroller', {});
        }));

        it('save - should make put request to api if microcontroller have id', inject(function($http){
            $http.put.and.returnValue($q.resolve());

            microcontrollersModel.save({id: 1});

            expect($http.put).toHaveBeenCalledWith('/api/v1/microcontroller/1', {id: 1});
        }));

        it('delete - should make request to server for delete', inject(function($http){
            $http.delete.and.returnValue($q.resolve());

            microcontrollersModel.delete(5);

            expect($http.delete).toHaveBeenCalledWith('/api/v1/microcontroller/5');
        }));

        it('bulkDelete - should make multiple request to server for delete', inject(function($http){
            microcontrollersModel.model.microcontrollers = [
                {id: 1, isSelected: true},
                {id: 2, isSelected: true}
            ];
            $http.delete.and.returnValue($q.resolve());

            microcontrollersModel.bulkDelete(5);

            expect($http.delete.calls.argsFor(0)).toEqual(['/api/v1/microcontroller/1']);
            expect($http.delete.calls.argsFor(1)).toEqual( ['/api/v1/microcontroller/2']);
        }));
    });
}());
