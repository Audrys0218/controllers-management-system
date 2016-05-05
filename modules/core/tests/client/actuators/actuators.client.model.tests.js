'use strict';

(function() {
    describe('actuatorsModel', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('addEditService', jasmine.createSpyObj('addEditService', ['open']));
            _$provide_.value('$http', jasmine.createSpyObj('$http', ['get', 'delete', 'put']));
            _$provide_.value('microcontrollersModel', jasmine.createSpyObj('microcontrollersModel', ['load']));
        }));

        var actuatorsModel,
            $q;

        beforeEach(inject(function(_actuatorsModel_, _$q_) {
            actuatorsModel = _actuatorsModel_;
            $q = _$q_;
        }));

        it('changeValue - should make put request to server', inject(function($http) {

            var result = actuatorsModel.changeValue({value: true, id: 5});

            expect($http.put).toHaveBeenCalledWith('/api/v1/actuator/5/value', {value: 1});
        }));

        it('bulkDeleteDisabled - should return true if all actuators is not selected', function() {
            actuatorsModel.model.actuators = [
                {isSelected: false},
                {isSelected: false}
            ];

            var result = actuatorsModel.bulkDeleteDisabled();

            expect(result).toBe(true);
        });

        it('bulkDeleteDisabled - should return false if one place selected', function() {
            actuatorsModel.model.actuators = [
                {isSelected: false},
                {isSelected: true}
            ];

            var result = actuatorsModel.bulkDeleteDisabled();

            expect(result).toBe(false);
        });

        it('addEdit - should use addEditService', inject(function(addEditService, microcontrollersModel, $http, $rootScope) {
            var deffered = $q.defer();
            addEditService.open.and.returnValue($q.resolve());
            $http.get.and.returnValue($q.resolve([]));
            microcontrollersModel.load.and.returnValue(deffered.promise);
            microcontrollersModel.model = {microcontrollersModel: []};

            actuatorsModel.addEdit();
            deffered.resolve();
            $rootScope.$digest();

            expect(addEditService.open).toHaveBeenCalled();
        }));

        it('load - make request to server for data', inject(function($http) {
            $http.get.and.returnValue($q.resolve());

            actuatorsModel.load();

            expect($http.get).toHaveBeenCalledWith('/api/v1/actuator');
        }));

        it('delete - should make request to server for delete', inject(function($http) {
            $http.delete.and.returnValue($q.resolve());

            actuatorsModel.delete(5);

            expect($http.delete).toHaveBeenCalledWith('/api/v1/actuator/5');
        }));

        it('bulkDelete - should make multiple request to server for delete', inject(function($http) {
            actuatorsModel.model.actuators = [
                {id: 1, isSelected: true},
                {id: 2, isSelected: true}
            ];
            $http.delete.and.returnValue($q.resolve());

            actuatorsModel.bulkDelete(5);

            expect($http.delete.calls.argsFor(0)).toEqual(['/api/v1/actuator/1']);
            expect($http.delete.calls.argsFor(1)).toEqual(['/api/v1/actuator/2']);
        }));
    });
}());
