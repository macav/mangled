(function() {
  'use strict';

  function appConfig($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
  };
  appConfig.$inject = ['$routeProvider'];

  // Declare app level module which depends on views, and components
  angular.module('wordgame', [
    'ngRoute',
    'ui.bootstrap',
    'wordgame.welcome',
    'wordgame.game'
  ]).
  config(appConfig);
})();
