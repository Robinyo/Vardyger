'use strict';

/**
 * Module dependencies
 */

var hbs = require('express-hbs'),
    _   = require('lodash');

function author(context, options) {

  var output = '';

  if (this.author.name) {
    output = _.escape(this.author.name);
  }

  return new hbs.handlebars.SafeString(output);
}

module.exports = author;