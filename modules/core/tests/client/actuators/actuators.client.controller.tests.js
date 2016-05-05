'use strict';

(function() {
    describe('ActuatorsController', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('actuatorsModel', jasmine.createSpyObj('actuatorsModel', ['addEdit', 'delete', 'bulkDelete', 'bulkDeleteDisabled', 'load', 'changeValue']));
            _$provide_.value('confirmation', jasmine.createSpyObj('confirmation', ['confirm']));
        }));

        var scope,
            actuatorsModel,
            $q;

        beforeEach(inject(function($rootScope, _$controller_, _actuatorsModel_, _$q_) {
            scope = $rootScope.$new();

            actuatorsModel = _actuatorsModel_;
            $q = _$q_;

            _$controller_('ActuatorsController', {$scope: scope});

        }));


        it('addEdit - should use addEditService', function(){

            scope.addEdit();

            expect(actuatorsModel.addEdit).toHaveBeenCalled();
        });

        it('toggleElectricitySwitcher - call change value on actuatorsModel', function(){

            scope.toggleElectricitySwitcher({});

            expect(actuatorsModel.changeValue).toHaveBeenCalledWith({});
        });

        it('onStopSlide - call change value on changeValue', function(){

            scope.onStopSlide(null, null, {});

            expect(actuatorsModel.changeValue).toHaveBeenCalledWith({});
        });

        it('load should call actuatorsModel load method', function() {
            actuatorsModel.load.and.returnValue($q.resolve());

            scope.load();

            expect(actuatorsModel.load).toHaveBeenCalledWith();
        });

        it('delete should ask for confirmation', inject(function(confirmation) {
            var actuatorId = 5;

            scope.delete(actuatorId);

            expect(confirmation.confirm).toHaveBeenCalled();
        }));

        it('delete - should ask for confirmation and call actuatorsModel.delete with id if confirmed', inject(function(confirmation) {
            var actuatorId = 5;

            scope.delete(actuatorId);
            var confirmationCallback = confirmation.confirm.calls.argsFor(0)[2];
            confirmationCallback();

            expect(confirmation.confirm).toHaveBeenCalled();
            expect(actuatorsModel.delete).toHaveBeenCalledWith(actuatorId);
        }));

        it('bulkDelete - should ask for confirmation and call actuatorsModel.bulkDelete if confirmed', inject(function(confirmation) {

            scope.bulkDelete();
            var confirmationCallback = confirmation.confirm.calls.argsFor(0)[2];
            confirmationCallback();

            expect(confirmation.confirm).toHaveBeenCalled();
            expect(actuatorsModel.bulkDelete).toHaveBeenCalledWith();
        }));
    });
}());
