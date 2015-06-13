'use strict';

var util = require('util');

function getPosts(req, res) {

  var name = req.swagger.params.name.value || 'stranger';
  var hello = util.format('getPosts - Hello, %s!', name);

  res.json(hello);
}

function putPost(req, res) {

  var name = req.swagger.params.name.value || 'stranger';
  var hello = util.format('putPost - Hello, %s!', name);

  res.json(hello);
}

module.exports = {
  getPosts: getPosts,
  putPost: putPost
};
