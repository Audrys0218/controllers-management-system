'use strict';

(function() {
    describe('ConfirmationController', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('$uibModalInstance', jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']));
        }));

        var scope;

        beforeEach(inject(function($rootScope, _$controller_) {
            scope = $rootScope.$new();

            _$controller_('ConfirmationController', {$scope: scope, data: {}});
        }));

        it('ok - should call close method on modal instance with text "ok"', inject(function($uibModalInstance) {

            scope.ok();

            expect($uibModalInstance.close).toHaveBeenCalledWith('ok');
        }));

        it('cancel - should call dismiss method on modal instance', inject(function($uibModalInstance) {

            scope.cancel();

            expect($uibModalInstance.dismiss).toHaveBeenCalledWith();
        }));
    });
}());
