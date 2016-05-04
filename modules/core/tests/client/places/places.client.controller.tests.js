'use strict';

(function() {
    describe('PlacesController', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('placesModel', jasmine.createSpyObj('placesModel', ['addEdit', 'delete', 'bulkDelete', 'bulkDeleteDisabled', 'load', 'start']));
            _$provide_.value('confirmation', jasmine.createSpyObj('confirmation', ['confirm']));
        }));

        var scope,
            placesModel;

        beforeEach(inject(function($rootScope, _$controller_, _placesModel_) {
            scope = $rootScope.$new();

            placesModel = _placesModel_;

            _$controller_('PlacesController', {$scope: scope});
        }));

        it('load should call placesModel load method', function() {

            scope.load();

            expect(placesModel.load).toHaveBeenCalledWith();
        });

        it('delete should ask for confirmation', inject(function(confirmation) {
            var placeId = 5;

            scope.delete(placeId);

            expect(confirmation.confirm).toHaveBeenCalled();
        }));

        it('delete - should ask for confirmation and call placesModel.delete with id if confirmed', inject(function(confirmation) {
            var placeId = 5;

            scope.delete(placeId);
            var confirmationCallback = confirmation.confirm.calls.argsFor(0)[2];
            confirmationCallback();

            expect(confirmation.confirm).toHaveBeenCalled();
            expect(placesModel.delete).toHaveBeenCalledWith(placeId);
        }));

        it('bulkDelete - should ask for confirmation and call placesModel.bulkDelete if confirmed', inject(function(confirmation) {

            scope.bulkDelete();
            var confirmationCallback = confirmation.confirm.calls.argsFor(0)[2];
            confirmationCallback();

            expect(confirmation.confirm).toHaveBeenCalled();
            expect(placesModel.bulkDelete).toHaveBeenCalledWith();
        }));
    });
}());
