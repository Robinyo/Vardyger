'use strict';

/**
 * Module dependencies
 */
var hbs = require('express-hbs');

function encode(context, str) {

  var uri = context || str;

  return new hbs.handlebars.SafeString(encodeURIComponent(uri));
}

module.exports = encode;