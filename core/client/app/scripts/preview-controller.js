/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

// Reference the 'vardyger' module to attach a controller

angular.module('vardyger')
  .controller('PreviewController',
  function(
    $log,   // inject the $log service
    $scope  // inject the $scope service
  ) {

    $log.info('PreviewController');

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
  });

