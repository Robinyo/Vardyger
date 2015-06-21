'use strict';

/**
 * Module dependencies
 * If a module is a directory, the file in the module directory that will be evaluated must be named index.js
 */

var hbs         = require('express-hbs'),
    coreHelpers = {};

coreHelpers.asset  = require('./asset');
coreHelpers.author  = require('./author');
coreHelpers.body_class  = require('./body_class');
coreHelpers.date   = require('./date');
coreHelpers.encode = require('./encode');
coreHelpers.ghost_foot = require('./ghost_foot');
coreHelpers.meta_description  = require('./meta_description');
coreHelpers.meta_title  = require('./meta_title');

function registerThemeHelperSync(name, fn) {
  hbs.registerHelper(name, fn);
}

function registerHelpers() {
  registerThemeHelperSync('asset', coreHelpers.asset);
  registerThemeHelperSync('author', coreHelpers.author);
  registerThemeHelperSync('body_class', coreHelpers.body_class);
  registerThemeHelperSync('date', coreHelpers.date);
  registerThemeHelperSync('encode', coreHelpers.encode);
  registerThemeHelperSync('ghost_foot', coreHelpers.ghost_foot);
  registerThemeHelperSync('meta_description', coreHelpers.meta_description);
  registerThemeHelperSync('meta_title', coreHelpers.meta_title);
}

module.exports = coreHelpers;
module.exports.loadCoreHelpers = registerHelpers;
module.exports.registerThemeHelperSync = registerThemeHelperSync;
