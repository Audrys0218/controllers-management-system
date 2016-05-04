'use strict';

(function() {
    describe('ActuatorsController', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('actuatorsModel', jasmine.createSpyObj('actuatorsModel', ['addEdit', 'delete', 'bulkDelete', 'bulkDeleteDisabled', 'load']));
            _$provide_.value('confirmation', jasmine.createSpyObj('confirmation', ['confirm']));
        }));

        var scope,
            actuatorsModel,
            $q;

        beforeEach(inject(function($rootScope, _$controller_, _actuatorsModel_, _$q_) {
            scope = $rootScope.$new();

            actuatorsModel = _actuatorsModel_;
            $q = _$q_;

            _$controller_('SensorsController', {$scope: scope});

            actuatorsModel.load.and.returnValue(_$q_.resolve());
        }));

        it('load should call actuatorsModel load method', function() {
            var deferred = $q.defer();
            actuatorsModel.load.and.returnValue(deferred.promise);

            scope.load();
            deferred.resolve();
            scope.$digest();

            expect(actuatorsModel.load).toHaveBeenCalledWith();
        });

        xit('delete should ask for confirmation', inject(function(confirmation) {
            var sensorId = 5;

            scope.delete(sensorId);

            expect(confirmation.confirm).toHaveBeenCalled();
        }));

        xit('delete - should ask for confirmation and call actuatorsModel.delete with id if confirmed', inject(function(confirmation) {
            var sensorId = 5;

            scope.delete(sensorId);
            var confirmationCallback = confirmation.confirm.calls.argsFor(0)[2];
            confirmationCallback();

            expect(confirmation.confirm).toHaveBeenCalled();
            expect(actuatorsModel.delete).toHaveBeenCalledWith(sensorId);
        }));

        xit('bulkDelete - should ask for confirmation and call actuatorsModel.bulkDelete if confirmed', inject(function(confirmation) {

            scope.bulkDelete();
            var confirmationCallback = confirmation.confirm.calls.argsFor(0)[2];
            confirmationCallback();

            expect(confirmation.confirm).toHaveBeenCalled();
            expect(actuatorsModel.bulkDelete).toHaveBeenCalledWith();
        }));
    });
}());
