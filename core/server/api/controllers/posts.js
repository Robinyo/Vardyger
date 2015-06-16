'use strict';

/**
 * Module dependencies.
 */

var extend = require('util')._extend;
var mongoose = require('mongoose');
var status = require('./http-status-codes');

var Post = mongoose.model('Post');

// POST /posts
// Rule: POST must be used to create a new resource in a collection
// Rule: Location must be used to specify the URI of a newly created resource

function addPost(req, res) {

  var model = new Post(req.body);

  res.type('application/json');

  model.save(function(error) {
    if (! error) {
      returnId(res, status.CREATED, model._id) ;
    } else {
      returnError(res, status.INTERNAL_SERVER_ERROR);
    }
  });
}

// GET /posts
// Rule: GET must be used to retrieve a representation of a resource
// Note: When we return the array of posts, we don’t simply return the model as returned from the database.
// That would expose internal implementation details. Instead, we pick the information we need and construct a
// new object to return.

function findPosts(req, res) {

  var filteredQuery = {};

  res.type('application/json');

  Post.find(filteredQuery, function(error, posts) {
    if (! error) {

      if (null === posts || undefined === posts)
      {
        returnError(res, status.NOT_FOUND);
      }

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
      returnError(res, status.INTERNAL_SERVER_ERROR);
    }
  });
}

// GET /posts/{id}
// Rule: GET must be used to retrieve a representation of a resource
// Note: When we return the array of posts, we don’t simply return the model as returned from the database.
// That would expose internal implementation details. Instead, we pick the information we need and construct a
// new object to return.

function findPostById(req, res) {

  var id = req.swagger.params.id.value;  // req.params.id

  // console.log('id: ' + req.swagger.params.id.value);

  res.type('application/json');

  Post.findById(id)
    .exec(function(error, model) {
      if (! error) {

        if (null === model || undefined === model)
        {
          returnError(res, status.NOT_FOUND);
        }

        return res.status(status.OK).send(JSON.stringify(
          {
            id: model._id,
            title: model.title,
            slug: model.slug,
            markdown: model.markdown,
            html: model.html,
            image: model.image,
            featured: model.featured,
            page: model.page,
            state: model.state,
            locale: model.locale,
            metaTitle: model.metaTitle,
            metaDescription: model.metaDescription
          }));

      } else {
        returnError(res, status.NOT_FOUND);
      }
    });
}

function findPostBySlug(req, res) {

}

// PUT /posts/{id}
// Rule: PUT must be used to both insert and update a stored resource
// Rule: PUT must be used to update mutable resources

function updatePost(req, res) {

  var id = req.swagger.params.id.value;  // req.params.id
  var body = req.body;

  delete body.id;

  // console.log('id: ' + req.swagger.params.id.value);
  // console.log('body: ' + JSON.stringify(body));

  res.type('application/json');

  Post.findById(id)
    .exec(function(error, model) {
      if (! error) {

        if (null === model || undefined === model)
        {
          returnError(res, status.NOT_FOUND);
        }

        // console.log(JSON.stringify(model));
        model = extend(model, body);
        // console.log(JSON.stringify(model));

        model.save(function(error) {
          if (! error) {
            returnId(res, status.OK, model._id) ;
          } else {
            returnError(res, status.INTERNAL_SERVER_ERROR);
          }
        });
      } else {
        returnError(res, status.NOT_FOUND);
      }
    });
}

// DELETE /posts/{id}
// Rule: DELETE must be used to remove a resource from its parent

function deletePost(req, res) {

  var id = req.swagger.params.id.value;  // req.params.id

  // console.log('id: ' + req.swagger.params.id.value);

  res.type('application/json');

  Post.findByIdAndRemove(id, function(error) {
    if (! error) {
      return res.status(status.OK).json({ id: id });
    } else {
      returnError(res, status.INTERNAL_SERVER_ERROR);
    }
  });
}

function returnId(res, statusCode, objectId) {
  res.location('/posts/' + objectId);
  return res.status(statusCode).send(JSON.stringify({ id: objectId }));
}

function returnError(res, statusCode) {

  var errorMessage = 'Something went wrong :(';

  switch(statusCode) {

    case status.BAD_REQUEST:
      errorMessage = 'Bad request';
      break;

    case status.NOT_FOUND:
      errorMessage = 'Resource not found';
      break;

    case status.INTERNAL_SERVER_ERROR:
    default:
      break;
  }

  return res.status(statusCode).send(JSON.stringify({ code: statusCode, message: errorMessage }));
}

module.exports = {
  addPost:        addPost,
  findPosts:      findPosts,
  findPostById:   findPostById,
  findPostBySlug: findPostBySlug,
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

  var obj = JSON.parse(fs.readFileSync(__dirname + path, 'utf8'));

  res.type('application/json');
  res.status(status.OK).send(obj);
}

*/