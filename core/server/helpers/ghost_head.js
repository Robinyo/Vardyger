'use strict';

/**
 * Module dependencies
 */

var hbs = require('express-hbs');

function ghost_head(options) {

  var output = '<link rel="canonical" href="' + this.url + '" />';

  return new hbs.handlebars.SafeString(output);
}

module.exports = ghost_head;

// TODO: revisit ghost_head

// head.push('<link rel="canonical" href="' + metaData.url + '" />');
// head.push('<meta name="generator" content="Ghost ' + safeVersion + '" />');
// <link rel="canonical" href="http://robferguson.org/2015/06/14/the-vardyger-publishing-platform/">