'use strict';

(function() {
    describe('confirmation', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('$uibModal', jasmine.createSpyObj('$uibModal', ['open']));
        }));

        var confirmation,
            $q,
            $http;

        beforeEach(inject(function(_confirmation_, _$q_) {
            confirmation = _confirmation_;
            $q = _$q_;
        }));

        it('confirm - should open modal', inject(function($uibModal){
            $uibModal.open.and.returnValue({
                result: $q.resolve()
            });

            confirmation.confirm();

            expect($uibModal.open).toHaveBeenCalled();
        }));
    });
}());
