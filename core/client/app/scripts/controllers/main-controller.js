/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

// Reference the 'vardyger' module to attach a controller

angular.module('vardyger')
  .controller('MainController',
    function(
      $log,         // inject the $log service
      $scope,       // inject the $scope service
      posts         // inject Posts model
    ) {

      $log.info('MainController');

      $scope.listItems = posts;

      // $log.info('$scope.listItems: ' + $scope.listItems);

    });


/*

angular.module('vardyger')
  .controller('MainController',
  function(
    $log,         // inject the $log service
    $scope,       // inject the $scope service
    PostsService  // inject the PostsService
  ) {

    $log.info('MainController');

    // Remember, values on $scope are called models and are also available in views.

    PostsService.findPosts();
    $scope.listItems = PostsService.getModel();

    // $log.info('$scope.listItems: ', $scope.listItems);

  });

*/
