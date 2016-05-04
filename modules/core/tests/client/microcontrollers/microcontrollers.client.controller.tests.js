'use strict';

(function() {
    describe('SensorsController', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('microcontrollersModel', jasmine.createSpyObj('microcontrollersModel', ['save', 'delete', 'bulkDelete', 'bulkDeleteDisabled', 'load']));
            _$provide_.value('confirmation', jasmine.createSpyObj('confirmation', ['confirm']));
            _$provide_.value('placesModel', jasmine.createSpyObj('placesModel', ['load']));
            _$provide_.value('$uibModal', jasmine.createSpyObj('$uibModal', ['open']));
        }));

        var scope,
            microcontrollersModel,
            $q;

        beforeEach(inject(function($rootScope, _$controller_, _microcontrollersModel_, _$q_) {
            scope = $rootScope.$new();

            microcontrollersModel = _microcontrollersModel_;
            $q = _$q_;

            _$controller_('MicrocontrollersController', {$scope: scope});

            microcontrollersModel.load.and.returnValue(_$q_.resolve());
        }));

        it('delete should ask for confirmation', inject(function(confirmation) {
            var microcontrollerId = 5;

            scope.delete(microcontrollerId);

            expect(confirmation.confirm).toHaveBeenCalled();
        }));

        it('delete - should ask for confirmation and call microcontrollersModel.delete with id if confirmed', inject(function(confirmation) {
            var microcontrollerId = 5;

            scope.delete(microcontrollerId);
            var confirmationCallback = confirmation.confirm.calls.argsFor(0)[2];
            confirmationCallback();

            expect(confirmation.confirm).toHaveBeenCalled();
            expect(microcontrollersModel.delete).toHaveBeenCalledWith(microcontrollerId);
        }));

        it('bulkDelete - should ask for confirmation and call microcontrollersModel.bulkDelete if confirmed', inject(function(confirmation) {

            scope.bulkDelete();
            var confirmationCallback = confirmation.confirm.calls.argsFor(0)[2];
            confirmationCallback();

            expect(confirmation.confirm).toHaveBeenCalled();
            expect(microcontrollersModel.bulkDelete).toHaveBeenCalledWith();
        }));


        it('addEdit - should load places and call modal', inject(function(placesModel, $uibModal, $rootScope) {
            var deferred = $q.defer();
            placesModel.load.and.returnValue(deferred.promise);

            scope.addEdit();
            deferred.resolve([]);
            $rootScope.$digest();

            expect(placesModel.load).toHaveBeenCalled();
            expect($uibModal.open).toHaveBeenCalled();
        }));

    });
}());
