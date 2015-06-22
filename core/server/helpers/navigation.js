'use strict';

/**
 * Module dependencies
 */

var hbs = require('express-hbs'),
    _   = require('lodash');

function navigation(options) {

  var navigationData = options.data.blog.navigation;

  if (!_.isObject(navigationData) || _.isFunction(navigationData)) {
    // return errors.logAndThrowError('navigation data is not an object or is a function');
    return new hbs.handlebars.SafeString('');
  }

  // {{navigation}} should no-op if no data is passed in
  if (navigationData.length === 0) {
    // return new hbs.SafeString('');
    return new hbs.handlebars.SafeString('');
  }

  // TODO:

}

module.exports = navigation;