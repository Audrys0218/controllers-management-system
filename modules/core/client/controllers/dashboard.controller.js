'use strict';

angular.module('core').controller('DashboardController', ['$scope', 'Socket', function ($scope, Socket) {

    // Make sure the Socket is connected
    if (!Socket.socket) {
        Socket.connect();
    }

    Socket.on('sensorsOnConnection', function(sensors){
        console.log('I got all sensors');
        $scope.sensors = sensors;
    });

    Socket.on('sensorValueChanged', function(sensor){
        console.log('I got all one sensor');
        var index = $scope.sensors.map(function(s){
            return s.id;
        }).indexOf(sensor.id);

        if(index > -1){
            $scope.sensors[index] = sensor;
        }
    });

}]);
