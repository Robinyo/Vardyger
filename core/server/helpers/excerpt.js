'use strict';

/**
 * Module dependencies
 */

var hbs      = require('express-hbs'),
    downsize = require('downsize');

function excerpt(options) {

  var truncateOptions = (options || {}).hash || {},
      excerpt;

  excerpt = String(this.html);

  // Strip inline and bottom footnotes
  excerpt = excerpt.replace(/<a href="#fn.*?rel="footnote">.*?<\/a>/gi, '');
  excerpt = excerpt.replace(/<div class="footnotes"><ol>.*?<\/ol><\/div>/, '');

  // Strip other html
  excerpt = excerpt.replace(/<\/?[^>]+>/gi, '');
  excerpt = excerpt.replace(/(\r\n|\n|\r)+/gm, ' ');

  if (!truncateOptions.words && !truncateOptions.characters) {
    truncateOptions.words = 50;
  }

  return new hbs.handlebars.SafeString(downsize(excerpt, truncateOptions));
}

module.exports = excerpt;

// downsize = Tag-safe truncation for HTML and XML. Works by word!