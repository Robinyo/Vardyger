'use strict';

/**
 * Module dependencies
 */

var hbs = require('express-hbs');

function asset(name) {

  var output = '';

  output = '/assets/' + name;

  return new hbs.handlebars.SafeString(output);
}

module.exports = asset;