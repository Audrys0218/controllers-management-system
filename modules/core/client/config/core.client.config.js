'use strict';

// Config HTTP Error Handling
angular.module('core').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Places',
      state: 'places',
      roles: ['*']
    });

    Menus.addMenuItem('topbar', {
      title: 'Sensors',
      state: 'sensors',
      roles: ['*']
    });

  }
]);
