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

      // https://docs.angularjs.org/api/ng/service/$sce

      var model = [

        {
          metaTitle: 'Ionic Style Guide',
          metaDescription: 'AngularJS is the toolset that underpins the Ionic Framework.',
          post: {
            id: '1',
            title: 'Ionic Style Guide',
            html: '<p>AngularJS is the toolset that underpins the Ionic Framework.</p>' +
              '<p>This means that if you want to use the Ionic Framework to develop hybrid mobile applications' +
              ' then you will need to understand how Angular web applications are built and structured. A great ' +
              'place to start is to take a look at the Angular project structure templates created by popular ' +
              'Yeoman <a href="http://yeoman.io/generators/" target="_blank">generators</a> and projects like ' +
              '<a href="http://joshdmiller.github.io/ng-boilerplate/#/home" target="_blank">ng-boilerplate</a></p>' +
              '<h3 id="yeoman">Yeoman</h3>' +
              '<p>Yeoman provides a <a href="http://yeoman.io/generators/" target="_blank">generator</a> ecosystem ' +
              'that helps you to kickstart new projects. A generator is basically a plugin that can be run with the ' +
              '<code>yo</code> command to create the scaffolding for a new project:</p>',
            markdown: 'AngularJS is the toolset that underpins the Ionic Framework.' +
              'This means that if you want to use the Ionic Framework to develop hybrid mobile applications then you ' +
              'will need to understand how Angular web applications are built and structured. A great place to start ' +
              'is to take a look at the Angular project structure templates created by popular Yeoman ' +
              '<a href="http://yeoman.io/generators/" target="_blank">generators</a> and projects like ' +
              '<a href="http://joshdmiller.github.io/ng-boilerplate/#/home" target="_blank">ng-boilerplate</a> ' +
              '### Yeoman' +
              'Yeoman provides a <a href="http://yeoman.io/generators/" target="_blank">generator</a> ecosystem ' +
              'that helps you to kickstart new projects. A generator is basically a plugin that can be run with ' +
              'the `yo` command to create the scaffolding for a new project:'
          }
        },

        {
          metaTitle: 'Customising Ionic with Sass',
          metaDescription: 'In a previous post, ...',
          post: {
            id: '2',
            title: 'Customising Ionic with Sass',
            html: '<p>In a previous post, ...</p>',
            markdown: 'In a previous post, ...'
          }
        },

        {
          metaTitle: 'Ionic, Angular and Cordova',
          metaDescription: 'In a previous post, ...',
          post: {
            id: '3',
            title: 'Ionic, Angular and Cordova',
            html: '<p>In a previous post, ...</p>',
            markdown: 'In a previous post, ...'
          }
        },

        {
          metaTitle: 'Annotating JavaScript using JSDoc tags',
          metaDescription: 'In a previous post, ...',
          post: {
            id: '4',
            title: 'Annotating JavaScript using JSDoc tags',
            html: '<p>In a previous post, ...</p>',
            markdown: 'In a previous post, ...'
          }
        },

        {
          metaTitle: 'Express, Handlebars and Ghost Themes',
          metaDescription: 'In a previous post, ...',
          post: {
            id: '5',
            title: 'Express, Handlebars and Ghost Themes',
            html: '<p>In a previous post, ...</p>',
            markdown: 'In a previous post, ...'
          }
        },

        {
          metaTitle: 'Swagger, Express, and Content Negotiation',
          metaDescription: 'In a previous post, ...',
          post: {
            id: '6',
            title: 'Swagger, Express, and Content Negotiation',
            html: '<p>In a previous post, ...</p>',
            markdown: 'In a previous post, ...'
          }
        },

        {
          metaTitle: 'The Vardyger publishing platform :)',
          metaDescription: 'In a previous post, ...',
          post: {
            id: '7',
            title: 'The Vardyger publishing platform :)',
            html: '<p>In a previous post, ...</p>',
            markdown: 'In a previous post, ...'
          }
        }

      ];

      this.getModel = function () {

        $log.info('getModel()');

        return model;
      };

      this.findPosts = function() {

        // $log.info('findPosts()');

        return model;
      };

      this.findPostById = function(id) {

        // $log.info('findPostById(): ' + id);

        var deferred = $q.defer();

        // Note: model.forEach NOT this.model.forEach

        model.forEach(function(item) {
          if (item.post.id === id) {
            // $log.info('item.post.id === id');
            deferred.resolve(item);
          }
        });

        return deferred.promise;
      };

    });


/*


 // $log.info('model.length: ' + model.length);

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

