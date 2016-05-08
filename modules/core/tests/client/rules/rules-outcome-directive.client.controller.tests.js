//'use strict';
//
//(function() {
//    describe('RuleOutcomeController', function() {
//        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
//            _$provide_.value('actuatorsOptionsModel', {
//                load: jasmine.createSpy('load'),
//                model: {
//                    actuatorsOptions: [{
//                            id: 1,
//                            place: 'test',
//                            actuator: 'test',
//                            type: 'analog_switch'
//                        }
//                    ]
//                }
//            });
//            _$provide_.value('actuatorsTypesModel', {
//                model: {
//                    'analog_switch': {
//                        label: 'Analog switch',
//                        min: 0,
//                        max: 100
//                    }
//                }
//            });
//        }));
//
//        var scope,
//            $q;
//
//        beforeEach(inject(function($rootScope, _$controller_, _$q_) {
//            scope = $rootScope.$new();
//            scope.outcome = {actuator: 1, index: 5};
//            $q = _$q_;
//
//            _$controller_('RuleOutcomeController', {$scope: scope});
//        }));
//
//        it('load - call actuatorsOptionsModel.load method', inject(function(actuatorsOptionsModel) {
//            actuatorsOptionsModel.load.and.returnValue($q.resolve());
//
//            scope.load();
//
//            expect(actuatorsOptionsModel.load).toHaveBeenCalled();
//        }));
//
//        it('getMin - should return min actuator value after actuatorsOptions load', inject(function(actuatorsOptionsModel) {
//            var deferred = $q.defer();
//            actuatorsOptionsModel.load.and.returnValue(deferred.promise);
//            scope.load();
//            deferred.resolve();
//            scope.$digest();
//
//            var actual = scope.getMin();
//
//            expect(actual).toBe(0);
//        }));
//
//    });
//}());
