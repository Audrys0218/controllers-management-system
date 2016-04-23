'use strict';

ApplicationConfiguration.registerModule('core', ['common', 'frapontillo.bootstrap-switch']);
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);
