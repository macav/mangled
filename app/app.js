(function() {
  'use strict';

  function appConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  };
  appConfig.$inject = ['$urlRouterProvider'];

  // Declare app level module which depends on views, and components
  angular.module('wordgame', [
    'ui.bootstrap',
    'ui.router',
    'wordgame.constants',
    'wordgame.welcome',
    'wordgame.game'
  ]).
  config(appConfig);
})();
