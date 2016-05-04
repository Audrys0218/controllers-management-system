'use strict';

(function() {
    describe('microcontrollersModel', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('$http', jasmine.createSpyObj('$http', ['get', 'delete', 'post', 'put']));
        }));

        var rulesModel,
            $q,
            $http;

        beforeEach(inject(function(_rulesModel_, _$q_, _$http_) {
            rulesModel = _rulesModel_;
            $q = _$q_;
            $http = _$http_;
        }));

        it('bulkDeleteDisabled - should return true if all sensors is not selected', function(){
            rulesModel.model.rules = [
                {isSelected: false},
                {isSelected: false}
            ];
            $http.delete.and.returnValue($q.resolve());

            var result = rulesModel.bulkDeleteDisabled();

            expect(result).toBe(true);
        });

        it('bulkDeleteDisabled - should return false if one sensor selected', function(){
            rulesModel.model.rules = [
                {isSelected: false},
                {isSelected: true}
            ];
            $http.delete.and.returnValue($q.resolve());

            var result = rulesModel.bulkDeleteDisabled();

            expect(result).toBe(false);
        });

        it('load - make request to server for data', inject(function($http){
            $http.get.and.returnValue($q.resolve());

            rulesModel.load();

            expect($http.get).toHaveBeenCalledWith('/api/v1/rules');
        }));

        it('save - should make post request to api', inject(function($http){
            $http.post.and.returnValue($q.resolve());

            rulesModel.save({});

            expect($http.post).toHaveBeenCalledWith('/api/v1/rules', {});
        }));

        it('save - should make put request to api if rule have id', inject(function($http){
            $http.put.and.returnValue($q.resolve());

            rulesModel.save({id: 1});

            expect($http.put).toHaveBeenCalledWith('/api/v1/rules/1', {id: 1});
        }));

        it('delete - should make request to server for delete', inject(function($http){
            $http.delete.and.returnValue($q.resolve());

            rulesModel.delete(5);

            expect($http.delete).toHaveBeenCalledWith('/api/v1/rules/5');
        }));

        it('get - should make request to server for one rule ', inject(function($http){
            $http.get.and.returnValue($q.resolve());

            rulesModel.get(5);

            expect($http.get).toHaveBeenCalledWith('/api/v1/rules/5');
        }));

        it('bulkDelete - should make multiple request to server for delete', inject(function($http){
            rulesModel.model.rules = [
                {id: 1, isSelected: true},
                {id: 2, isSelected: true}
            ];
            $http.delete.and.returnValue($q.resolve());

            rulesModel.bulkDelete(5);

            expect($http.delete.calls.argsFor(0)).toEqual(['/api/v1/rules/1']);
            expect($http.delete.calls.argsFor(1)).toEqual( ['/api/v1/rules/2']);
        }));
    });
}());
