'use strict';

/**
 * Module dependencies
 */

var hbs = require('express-hbs');

function ghost_foot(options) {

  // <script src="/public/jquery.min.js?v=0c731734a5"></script>

  var output = '<script type="text/javascript" src="/assets/js/jquery.js"></script>';

  return new hbs.handlebars.SafeString(output);
}

module.exports = ghost_foot;

// TODO: revisit ghost_foot