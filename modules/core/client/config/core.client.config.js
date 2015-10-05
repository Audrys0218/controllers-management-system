'use strict';

// Config HTTP Error Handling
angular.module('core').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Places',
      state: 'places',
      roles: ['*']
    });

  }
]);
