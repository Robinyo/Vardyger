'use strict';

/**
 * Module dependencies
 */

var hbs = require('express-hbs');

function content(options) {
  return new hbs.handlebars.SafeString(this.html || '');
}

module.exports = content;

// downsize = Tag-safe truncation for HTML and XML. Works by word!