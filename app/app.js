(function() {
  'use strict';

  function appConfig($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
  };
  appConfig.$inject = ['$routeProvider'];

  // Declare app level module which depends on views, and components
  angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
  ]).
  config(appConfig);
})();
