'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var status = require('./http-status-codes');

var Post = mongoose.model('Post');

// POST /posts
// Rule: POST must be used to create a new resource in a collection
// Rule: Location must be used to specify the URI of a newly created resource

function addPost(req, res) {

  var model = new Post(req.body);

  // console.log(JSON.stringify(model));

  res.type('application/json');

  model.save(function (error) {
    if (! error) {
      res.location('/posts/' + model._id);
      // res.status(status.CREATED).send('{ "id": "' + model._id + '" }');
      res.status(status.CREATED).json({ id: model._id });
    } else {
      res.status(status.INTERNAL_SERVER_ERROR).send('{ "code": "500", "message": "Something went wrong :(" }');
    }
  });
}

// GET /posts
// Rule: GET must be used to retrieve a representation of a resource

function findPosts(req, res) {

  var filteredQuery = {};

  Post.find(filteredQuery, function (error, posts) {
    if (! error) {
      res.status(status.OK).json(posts.map(function(a){
        return {
          id: a._id,
          title: a.title,
          slug: a.slug,
          markdown: a.markdown,
          html: a.html,
          image: a.image,
          featured: a.featured,
          page: a.page,
          state: a.state,
          locale: a.locale,
          metaTitle: a.metaTitle,
          metaDescription: a.metaDescription
        }
      }));
    } else {
      res.status(status.INTERNAL_SERVER_ERROR).send('{ "code": "500", "message": "Something went wrong :(" }');
    }
  });
}

// PUT /posts/{id}
// Rule: PUT must be used to both insert and update a stored resource
// Rule: PUT must be used to update mutable resources

function updatePost(req, res) {

  var responseCode = status.OK;

  // do something ...

  res.type('application/json');

  switch (responseCode) {

    case status.OK:
      res.status(status.OK).send('{ "id": "123456" }');
      break;

    case status.BAD_REQUEST:
    // case status.NOT_FOUND:
    default:
      res.status(status.BAD_REQUEST).end('{ "code": "400", "message": "Something went wrong :(" }');
      break;
  }
}

// DELETE /posts/{id}
// Rule: DELETE must be used to remove a resource from its parent

function deletePost(req, res) {

  var responseCode = status.OK;

  // do something ...

  res.type('application/json');

  switch (responseCode) {

    case status.OK:
      res.status(status.OK).send('{ "id": "123456" }');
      break;

    case status.NOT_FOUND:
    default:
      res.status(status.BAD_REQUEST).end('{ "code": "404", "message": "Something went wrong :(" }');
      break;
  }
}

module.exports = {
  addPost:        addPost,
  findPosts:      findPosts,
  // findPostById:   findPostById,
  // findPostBySlug: findPostBySlug,
  updatePost:     updatePost,
  deletePost:     deletePost
}

/*

var fs = require('fs');

// serveStaticFileSync(res, '/posts.json');
// serveStaticFile(res, '/posts.json');

function serveStaticFile(res, path) {

  res.type('application/json');

  fs.readFile(__dirname + path, 'utf8', function (error, data) {
    if (error) {
      res.status(status.INTERNAL_SERVER_ERROR).send('{ "code": "500", "message": "Something went wrong :(" }');
    } else {
      res.status(status.OK).send(JSON.parse(data));
    }
  });
}

function serveStaticFileSync(res, path) {

  // var obj = fs.readFileSync(__dirname + path, 'utf8');
  var obj = JSON.parse(fs.readFileSync(__dirname + path, 'utf8'));

  res.type('application/json');
  res.status(status.OK).send(obj);
}

*/