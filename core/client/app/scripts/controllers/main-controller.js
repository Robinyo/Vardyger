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
      $http,        // inject the $http service
      posts,        // inject the resolved posts data
      $timeout,
      $ionicScrollDelegate
    ) {

      $log.info('MainController');

      $scope.listItems = {};

      // Or you can use $state.reload()

      $scope.$on('$ionicView.beforeEnter', function() {
        // The view has fully entered and is now the active view.
        // This event will fire, whether it was the first load or a cached view.
        $log.info('MainController - $ionicView.beforeEnter');

        // $ionicHistory.clearHistory();
      });

      // Values on $scope are called models and are also available in views.

      // $scope.listItems = posts;

      $http.get('https://posts')
        .success(function (data, status, headers, config) {
          $log.info('MainController - $http.get()');

          // $scope.listItems = data;

          // See: http://forum.ionicframework.com/t/ngfx-animation-in-ionic/15176

          for (var i = 0; i < data.length; i++) {
            (function() {
              var j = i;
              $timeout(function(){
                $scope.listItems[j] = data[j];
                $ionicScrollDelegate.resize();
              }, j * 300);
            })();
          }
        })
        .error(function (data, status, headers, config) {
          $log.error('An error occurred: ' + status);
        });

    });

