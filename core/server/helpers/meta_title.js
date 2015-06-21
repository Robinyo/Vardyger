'use strict';

/**
 * Module dependencies
 */

var hbs = require('express-hbs'),
    _   = require('lodash');

function meta_title(context, options) {

  var output = '';

  if (this.meta_title) {
    output = _.escape(this.meta_title);
  }

  return new hbs.handlebars.SafeString(output);
}

module.exports = meta_title;