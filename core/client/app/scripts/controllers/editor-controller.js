/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

// Reference the 'vardyger' module to attach a controller

angular.module('vardyger')
  .controller('EditorController',
  function(
    $log,         // inject the $log service
    $scope,       // inject the $scope service
    post          // inject Post model
  ) {

    $log.info('EditorController');

    $scope.item = post;

    // $log.info('$scope.item: ', $scope.item);

  });

