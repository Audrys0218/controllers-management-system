'use strict';

ApplicationConfiguration.registerModule('core', ['common']);
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);
