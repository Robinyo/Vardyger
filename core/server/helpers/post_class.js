'use strict';

/**
 * Module dependencies
 */

var hbs = require('express-hbs');

function post_class(options) {

  var output = 'post tag-express-js tag-swagger tag-vardyger';

  return new hbs.handlebars.SafeString(output);
}

module.exports = post_class;