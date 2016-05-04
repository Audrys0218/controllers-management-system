'use strict';

(function() {
    describe('RulesController', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('confirmation', jasmine.createSpyObj('confirmation', ['confirm']));
            _$provide_.value('$uibModal', jasmine.createSpyObj('$uibModal', ['open']));
            _$provide_.value('rulesModel', jasmine.createSpyObj('rulesModel', ['delete', 'load', 'bulkDelete']));
        }));

        var scope,
            rulesModel,
            $q;

        beforeEach(inject(function($rootScope, _$controller_, _rulesModel_, _$q_) {
            scope = $rootScope.$new();
            rulesModel = _rulesModel_;
            $q = _$q_;

            _$controller_('RulesController', {$scope: scope});
        }));

        it('delete should ask for confirmation', inject(function(confirmation) {
            var microcontrollerId = 5;

            scope.delete(microcontrollerId);

            expect(confirmation.confirm).toHaveBeenCalled();
        }));

        it('delete - should ask for confirmation and call rulesModel.delete with id if confirmed', inject(function(confirmation) {
            var ruleId = 5;

            scope.delete(ruleId);
            var confirmationCallback = confirmation.confirm.calls.argsFor(0)[2];
            confirmationCallback();

            expect(confirmation.confirm).toHaveBeenCalled();
            expect(rulesModel.delete).toHaveBeenCalledWith(ruleId);
        }));

        it('bulkDelete - should ask for confirmation and call rulesModel.bulkDelete if confirmed', inject(function(confirmation) {

            scope.bulkDelete();
            var confirmationCallback = confirmation.confirm.calls.argsFor(0)[2];
            confirmationCallback();

            expect(confirmation.confirm).toHaveBeenCalled();
            expect(rulesModel.bulkDelete).toHaveBeenCalledWith();
        }));


        it('addEdit - should and call modal', inject(function($uibModal, $rootScope) {
            var deferred = $q.defer();

            scope.addEdit();
            deferred.resolve([]);
            $rootScope.$digest();

            expect($uibModal.open).toHaveBeenCalled();
        }));
    });
}());
