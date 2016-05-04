'use strict';

(function() {
    describe('PlacesController', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('placesModel', jasmine.createSpyObj('placesModel', ['addEdit', 'delete', 'bulkDelete', 'bulkDeleteDisabled', 'load']));
        }));
    });
}());
