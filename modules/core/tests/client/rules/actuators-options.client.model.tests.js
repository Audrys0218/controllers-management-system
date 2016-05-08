'use strict';

(function() {
    describe('microcontrollersModel', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('$http', jasmine.createSpyObj('$http', ['get']));
        }));

        var actuatorsOptionsModel,
            $http;

        beforeEach(inject(function(_actuatorsOptionsModel_, _$http_) {
            actuatorsOptionsModel = _actuatorsOptionsModel_;
            $http = _$http_;
        }));

        it('load - should make call to API', inject(function($http, $q){
            $http.get.and.returnValue($q.resolve());

            actuatorsOptionsModel.load();

            expect($http.get).toHaveBeenCalledWith('/api/v1/rules/actuators-options');
        }));
    });
}());
