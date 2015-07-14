/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

// Reference the 'vardyger' module to attach a service

angular.module('vardyger')
  .service('PostsService',
    function(
      $log,  // inject the $log service
      $q     // inject the $q service
    ) {

      $log.info('PostsService');

      var model = [];
      var sampleData = [

        {
          metaTitle: 'metaTitle',
          metaDescription: 'metaDescription',
          post: {
            id: '1',
            title: 'Annotating JavaScript using JSDoc tags',
            html: ''
          }
        },

        {
          metaTitle: 'metaTitle',
          metaDescription: 'metaDescription',
          post: {
            id: '2',
            title: 'Express, Handlebars and Ghost Themes',
            html: ''
          }
        },

        {
          metaTitle: 'metaTitle',
          metaDescription: 'metaDescription',
          post: {
            id: '3',
            title: 'Swagger, Express, and Content Negotiation',
            html: ''
          }
        },

        {
          metaTitle: 'metaTitle',
          metaDescription: 'metaDescription',
          post: {
            id: '4',
            title: 'The Vardyger publishing platform :)',
            html: ''
          }
        }
      ];

      // model = sampleData;
      // $log.info('model: ', model);

      this.getModel = function () {

        $log.info('getModel()');

        return model;
      };

      this.findPosts = function() {

        $log.info('findPosts()');

        model = sampleData;

        return model;
      };

      this.findPostById = function(id) {

        $log.info('findPostById(): ', id);

        return model[id];
      };

    });



/*

this.findPosts = function() {

  $log.info('findPosts()');

  var deferred = $q.defer();

  setTimeout(function() {
    model = sampleData;
    deferred.resolve(sampleData);
  }, 2000);

  return deferred.promise;
};


 $scope.item = {

 metaTitle: 'metaTitle',
 metaDescription: 'metaDescription',
 post: {
 id: 'id',
 title: 'Annotating JavaScript using JSDoc tags',
 excerpt: '',
 html: '',
 url: '',
 image: '',
 featured: false,
 page: false,
 // state: 'draft',
 // locale: 'en_GB',
 publishedAt: '',
 updatedAt: '',
 createdAt: '',
 author: {
 name: 'Rob Ferguson',
 location: 'Sydney, Australia'
 },
 tags: ''
 }

 };

*/

