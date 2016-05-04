'use strict';

(function() {
    describe('SensorsController', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('sensorsModel', jasmine.createSpyObj('sensorsModel', ['addEdit', 'delete', 'bulkDelete', 'bulkDeleteDisabled', 'load', 'startUpdatingSensorsValues', 'stopUpdatingSensorsValues']));
            _$provide_.value('confirmation', jasmine.createSpyObj('confirmation', ['confirm']));
        }));

        var scope,
            sensorsModel,
            $q;

        beforeEach(inject(function($rootScope, _$controller_, _sensorsModel_, _$q_) {
            scope = $rootScope.$new();

            sensorsModel = _sensorsModel_;
            $q = _$q_;

            _$controller_('SensorsController', {$scope: scope});

            sensorsModel.load.and.returnValue(_$q_.resolve());
        }));

        it('load should call sensorsModel load method and startUpdatingSensorsValues', function() {
            var deferred = $q.defer();
            sensorsModel.load.and.returnValue(deferred.promise);

            scope.load();
            deferred.resolve();
            scope.$digest();

            expect(sensorsModel.load).toHaveBeenCalledWith();
            expect(sensorsModel.startUpdatingSensorsValues).toHaveBeenCalledWith();
        });

        it('delete should ask for confirmation', inject(function(confirmation) {
            var sensorId = 5;

            scope.delete(sensorId);

            expect(confirmation.confirm).toHaveBeenCalled();
        }));

        it('delete - should ask for confirmation and call sensorsModel.delete with id if confirmed', inject(function(confirmation) {
            var sensorId = 5;

            scope.delete(sensorId);
            var confirmationCallback = confirmation.confirm.calls.argsFor(0)[2];
            confirmationCallback();

            expect(confirmation.confirm).toHaveBeenCalled();
            expect(sensorsModel.delete).toHaveBeenCalledWith(sensorId);
        }));

        it('bulkDelete - should ask for confirmation and call sensorsModel.bulkDelete if confirmed', inject(function(confirmation) {

            scope.bulkDelete();
            var confirmationCallback = confirmation.confirm.calls.argsFor(0)[2];
            confirmationCallback();

            expect(confirmation.confirm).toHaveBeenCalled();
            expect(sensorsModel.bulkDelete).toHaveBeenCalledWith();
        }));
    });
}());
