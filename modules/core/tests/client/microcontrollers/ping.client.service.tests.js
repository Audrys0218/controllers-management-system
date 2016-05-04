'use strict';

(function() {
    describe('SensorsController', function() {
        beforeEach(module(ApplicationConfiguration.applicationModuleName, function(_$provide_) {
            _$provide_.value('$http', jasmine.createSpyObj('$http', ['post']));
        }));

        var pingService;

        beforeEach(inject(function(_pingService_) {
            pingService = _pingService_;
        }));

        it('ping - should make post request to api with specified ip', inject(function($http, $q, $rootScope) {
            var ip = '192.168.0.1',
                deferred = $q.defer();
            $http.post.and.returnValue(deferred.promise);

            pingService.ping(ip);
            deferred.resolve({data: {isAlive: true}});
            $rootScope.$digest();

            expect($http.post).toHaveBeenCalledWith('api/v1/microcontroller/ping', {ip: ip});
        }));

    });
}());
