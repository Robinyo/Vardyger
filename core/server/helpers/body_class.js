'use strict';

/**
 * Module dependencies
 */

var hbs = require('express-hbs');

function body_class(options) {

  var output = 'post-template';

  return new hbs.handlebars.SafeString(output);
}

module.exports = body_class;