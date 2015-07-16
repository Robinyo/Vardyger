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

      var model = [
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
        },

        {
          metaTitle: 'metaTitle',
          metaDescription: 'metaDescription',
          post: {
            id: '5',
            title: 'Build your Microservices API with Swagger and Express',
            html: ''
          }
        },

        {
          metaTitle: 'metaTitle',
          metaDescription: 'metaDescription',
          post: {
            id: '6',
            title: 'A JavaScript Microservices stack',
            html: ''
          }
        },

        {
          metaTitle: 'metaTitle',
          metaDescription: 'metaDescription',
          post: {
            id: '7',
            title: 'Microservices and Exponential Organisations',
            html: ''
          }
        }
      ];

      // $log.info('model: ', model);

      this.getModel = function () {

        $log.info('getModel()');

        return model;
      };

      this.findPosts = function() {

        $log.info('findPosts()');

        return model;
      };

      this.findPostById = function(id) {

        $log.info('findPostById(): ' + id);

        $log.info('model.length: ' + model.length);

        var deferred = $q.defer();

        // Note: model.forEach NOT this.model.forEach

        model.forEach(function(item) {
          if (item.post.id === id) {
            $log.info('item.post.id === id');
            deferred.resolve(item);
          }
        });

        return deferred.promise;
      };

    });


/*

  setTimeout(function() {
     model.forEach(function(item) {
       if (item.post.id === id) {
         $log.info('item.post.id === id');
         deferred.resolve(item);
       }
     });
  }, 2000);



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

