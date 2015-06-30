/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var util = require('util');  // console.log(util.inspect(anyObject));
var extend = util._extend;
var mongoose = require('mongoose');
var status = require('../../utils/http-status-codes');

var Post = mongoose.model('Post');

var LOCATION = '/posts/';
var APPLICATION_JSON = 'application/json';
var TEXT_HTML = 'text/html';

/**
 * addPost
 *
 * creates a new post in the Posts collection.</br>
 * Location (in the response header) is used to specify the URI of the newly created resource.
 *
 * @public
 * @param {req} req - The HTTP request object.
 * @param {res} res - The HTTP response object.
 * @return {id} string - The unique id of the resource that was created.
 * @see {@link http://expressjs.com/api.html#req}
 * @see {@link http://expressjs.com/api.html#res}
 */
function addPost(req, res) {

  var model = new Post(req.body);

  res.type(APPLICATION_JSON);

  model.save(function(error) {
    if (! error) {

      returnId(res, status.CREATED, model._id);

      /*

      res.format({
        html: function(){
          return res.status(201).send('<html><body><h1>addPost()</h1></body></html>');
        },
        json: function(){
          // res.type(APPLICATION_JSON);
          returnId(res, status.CREATED, model._id);
        },
        'default': function() {
          returnError(res, status.NOT_ACCEPTABLE);
        }
      })

      */

    } else {
      returnError(res, status.INTERNAL_SERVER_ERROR);
    }
  });
}

/**
 * findPosts
 *
 * returns all the posts in the Posts collection.</br>
 *
 * When we return the array of posts, we don’t simply return the model as returned from the database.
 * That would expose internal implementation details. Instead, we pick the information we need and construct a
 * new object to return.</br></br>
 *
 * Rule: GET must be used to retrieve a representation of a resource
 *
 * @public
 * @param {req} req - The HTTP request object.
 * @param {res} res - The HTTP response object.
 * @return {posts} posts - The posts collection.
 * @see {@link http://expressjs.com/api.html#req}
 * @see {@link http://expressjs.com/api.html#res}
 */
function findPosts(req, res) {

  var filteredQuery = {};

  res.type(APPLICATION_JSON);

  Post.find(filteredQuery, function(error, posts) {
    if (! error) {

      if (null === posts || undefined === posts)
      {
        returnError(res, status.NOT_FOUND);
      }

      // Node defaults to "transfer-encoding": "chunked"
      // Sending a 'Content-length' header will disable the default encoding.
      // res.setHeader("Content-Length", Buffer.byteLength(posts));

      res.format({
        html: function(){
          res.type(TEXT_HTML);
          res.status(status.OK).send('<html><body><h1>findPosts()</h1></body></html>');
        },

        json: function(){
          res.type(APPLICATION_JSON);
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
        },

        'default': function() {
          returnError(res, status.NOT_ACCEPTABLE);
        }
      })
    } else {
      returnError(res, status.INTERNAL_SERVER_ERROR);
    }
  });
}

/**
 * findPostById
 *
 * returns a post in the Posts collection.</br>
 *
 * When we return the post, we don’t simply return the model as returned from the database.
 * That would expose internal implementation details. Instead, we pick the information we need and construct a
 * new object to return.</br></br>
 *
 * Rule: GET must be used to retrieve a representation of a resource
 *
 * @public
 * @param {req} req - The HTTP request object.
 * @param {res} res - The HTTP response object.
 * @return {post} post - A post from the posts collection.
 * @see {@link http://expressjs.com/api.html#req}
 * @see {@link http://expressjs.com/api.html#res}
 */
function findPostById(req, res) {

  // Note: req.swagger.params.id.value not req.params.id
  // See: https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md
  var id = req.swagger.params.id.value,
      view = 'post',
      response;

  // console.log('id: ' + id);

  Post.findById(id).exec(function(error, model) {

    if (! error) {

      if (null === model || undefined === model) { returnError(res, status.NOT_FOUND); }

      response = formatResponse(model);
      // setResponseContext(req, res, response);

      res.format({
        html: function() {
          // The view engine will return a content type of text/html and a status code of 200 by default.
          // res.type(TEXT_HTML);
          res.render(view, response);
        },
        json: function() {
          res.type(APPLICATION_JSON);
          res.status(status.OK).send(JSON.stringify(response));
        },
        'default': function() { returnError(res, status.NOT_ACCEPTABLE); }
      })

    } else {
      returnError(res, status.INTERNAL_SERVER_ERROR);
    }
  });
}

var url = 'http://robferguson.org';
// var url = 'http://localhost:10010';

/**
 * formatResponse
 *
 * returns a formatted response object see: {@link http://themes.ghost.org/v0.6.4/docs/post-context}</br>
 *
 * Except where the doco is incorrect:</br>
 *   - 'content' helper returns (#post) this.html</br>
 *   - 'meta_title' helper returns this.metaTitle</br>
 *   - 'meta_description' helper returns this.metaDescription</br></br>
 *
 * Rule: GET must be used to retrieve a representation of a resource
 *
 * @public
 * @param {model} model - The Post model.
 * @return {post} post - A Ghost formatted post object.
 */
function formatResponse(model) {
  return {
    meta_title: model.metaTitle,
    meta_description: model.metaDescription,
    navigation: [{
      label: 'Home',
      url: url,
      current: false,
      slug: ''
    }, {
      label: 'About',
      url: url + '/about',
      current: false,
      slug: 'about'
    }],
    post: {
      id: model._id,
      title: model.title,
      excerpt: model.html,
      html: model.html,
      url: url,
      image: model.image,
      featured: model.featured,
      page: model.page,
      published_at: model.publishedAt,
      updated_at: model.updatedAt,
      created_at: model.createdAt,
      author: {
        name: 'Rob Ferguson',
        location: 'Sydney, Australia'
      },
      tags: ''
    }
  }
}

// website:
// bio:
// excerpt: model.html.slice(0, 255),

function setResponseContext(req, res, data) {

  var contexts = [];

  contexts.push('post');

  res.locals.context = contexts;
}

function findPostBySlug(req, res) {

}

/**
 * updatePost
 *
 * updates a post in the Posts collection.</br>
 *
 * Swagger sets req.swagger.params.id.value not req.params.id, see:
 * {@link https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md}</br></br>
 *
 * Rule: PUT must be used to both insert and update a stored resource</br>
 * Rule: PUT must be used to update mutable resources
 *
 * @public
 * @param {req} req - The HTTP request object.
 * @param {res} res - The HTTP response object.
 * @return {id} string - The unique id of the resource that was updated.
 * @see {@link http://expressjs.com/api.html#req}
 * @see {@link http://expressjs.com/api.html#res}
 */
function updatePost(req, res) {

  var id = req.swagger.params.id.value;

  // console.log('id: ' + id);

  var body = req.body;

  // console.log(util.inspect(body));

  delete body.id;

  // console.log(util.inspect(body));

  res.type(APPLICATION_JSON);

  Post.findById(id)
    .exec(function(error, model) {
      if (! error) {

        if (null === model || undefined === model)
        {
          returnError(res, status.NOT_FOUND);
        }

        // console.log(util.inspect(model));
        model = extend(model, body);
        // console.log(util.inspect(model));

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

/**
 * deletePost
 *
 * deletes a post in the Posts collection.</br>
 *
 * Swagger sets req.swagger.params.id.value not req.params.id, see:
 * {@link https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md}</br></br>
 *
 * Rule: DELETE must be used to remove a resource from its parent
 *
 * @public
 * @param {req} req - The HTTP request object.
 * @param {res} res - The HTTP response object.
 * @return {id} string - The unique id of the resource that was deleted.
 * @see {@link http://expressjs.com/api.html#req}
 * @see {@link http://expressjs.com/api.html#res}
 */
function deletePost(req, res) {

  var id = req.swagger.params.id.value;

  // console.log('id: ' + id);

  res.type(APPLICATION_JSON);

  Post.findByIdAndRemove(id, function(error) {
    if (! error) {
      returnId(res, status.OK, id);
    } else {
      returnError(res, status.INTERNAL_SERVER_ERROR);
    }
  });
}

function returnId(res, statusCode, objectId) {
  res.location(LOCATION + objectId);
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

    case status.NOT_ACCEPTABLE:
      errorMessage = 'Not acceptable';
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
  // findPostBySlug: findPostBySlug,
  updatePost:     updatePost,
  deletePost:     deletePost
}

//        http://themes.ghost.org/v0.6.4/docs/navigation
//        Ghost/core/server/controllers/frontend.js
// Note: You can override the default template by placing a file called navigation.hbs in the partials directory
//       of your theme.

/*

// validateResponse: true,

json: function(){
  res.type(APPLICATION_JSON);
  res.status(status.OK).send(JSON.stringify(
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
}

*/
