'use strict';

/**
 * Module dependencies
 */

var hbs = require('express-hbs'),
    _   = require('lodash');

function meta_description(context, options) {

  var output = '';

  if (this.meta_description) {
    output = _.escape(this.meta_description);
  }

  return new hbs.handlebars.SafeString(output);
}

module.exports = meta_description;