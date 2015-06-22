'use strict';

/**
 * Module dependencies
 */

var hbs = require('express-hbs');

function body_class(options) {

  var output = 'post-template tag-express-js tag-swagger tag-vardyger';

  return new hbs.handlebars.SafeString(output);
}

module.exports = body_class;