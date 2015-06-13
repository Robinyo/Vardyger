'use strict';

var status = require('./httpResponseStatusCodes');

// Post
// Rule: POST must be used to create a new resource in a collection
// Rule: Location must be used to specify the URI of a newly created resource

function post(req, res) {

  var responseCode = status.CREATED;

  // do something ...

  res.type('application/json');

  switch (responseCode) {

    case status.CREATED:
      res.location('/posts/123456');
      res.status(status.CREATED).send('{ "id": "123456" }');
      break;

    case status.BAD_REQUEST:
    default:
      res.status(status.BAD_REQUEST).send('{ "code": "400", "message": "Something went wrong :(" }');
      break;
  }
}

function put(req, res) {

  var responseCode = status.OK;

  // do something ...

  res.type('application/json');

  switch (responseCode) {

    case status.OK:
      res.status(status.OK).send('{ "id": "123456" }');
      break;

    case status.BAD_REQUEST:
    default:
      res.status(status.BAD_REQUEST).send('{ "code": "400", "message": "Something went wrong :(" }');
      break;
  }
}

module.exports = {
  post: post,
  put: put
}

// cd ~/opt/WebStorm/projects/Vardyger/core/server
// swagger project start
// swagger project edit

