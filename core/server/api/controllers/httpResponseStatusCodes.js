'use strict';

module.exports = {

  OK: 200,                      // Indicates a nonspecific success
  CREATED: 201,                 // Sent primarily by collections and stores but sometimes also by controllers,
                                //  to indicate that a new resource has been created
  ACCEPTED: 202,                // Sent by controllers to indicate the start of an asynchronous action
  NO_CONTENT: 204,              // Indicates that the body has been intentionally left blank
  MOVED_PERMANENTLY: 301,       // Indicates that a new permanent URI has been assigned to the client’s requested resource
  NOT_MODIFIED: 304,            // Sent to preserve bandwidth (with conditional GET)
  TEMPORARY_REDIRECT: 307,      // Indicates that a temporary URI has been assigned to the client’s requested resource
  BAD_REQUEST: 400,             // Indicates a nonspecific client error
  UNAUTHORISED: 401,            // Sent when the client either provided invalid credentials or forgot to send them
  FORBIDDEN: 403,               // Used to forbid access regardless of authorisation state
  NOT_FOUND: 404,               // Sent when the client tried to interact with a URI that the REST API could not map to a resource
  METHOD_NOT_ALLOWED: 405,      // Sent when the client tried to interact using an unsupported HTTP method
  NOT_ACCEPTABLE: 406,          // Sent when the client tried to request data in an unsupported media type format
  UNSUPPORTED_MEDIA_TYPE: 415,  // Sent when the client submitted data in an unsupported media type format
  INTERNAL_SERVER_ERROR: 500    // Tells the client that the API is having problems of its own

};