'use strict';

/**
 * Module dependencies
 */

var hbs      = require('express-hbs'),
    _        = require('lodash'),
    template = require('./template');

function navigation(options) {

  var navigationData = options.data.blog.navigation,
      output,
      context;

  if (!_.isObject(navigationData) || _.isFunction(navigationData)) {
    // return errors.logAndThrowError('navigation data is not an object or is a function');
    return new hbs.handlebars.SafeString('');
  }

  // {{navigation}} should no-op if no data is passed in
  if (navigationData.length === 0) {
    // return new hbs.SafeString('');
    return new hbs.handlebars.SafeString('');
  }

  output = navigationData.map(function (e) {
    var out = {};
    // out.current = e.url === currentUrl;
    out.current = false;
    out.label = e.label;
    out.slug = _slugify(e.label);
    out.url = hbs.handlebars.Utils.escapeExpression(e.url);
    return out;
  });

  context = _.merge({}, {navigation: output});

  return template.execute('navigation', context, options);
}

module.exports = navigation;

// currentUrl = options.data.root.relativeUrl,