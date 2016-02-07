(function() {
  'use strict';
  
  function AppConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }
  AppConfig.$inject = ['$urlRouterProvider'];

  function AppRun($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      if (toState.resolve) {
          $rootScope.loading = true;
      }
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (toState.resolve) {
            $rootScope.loading = false;
        }
    });
  }
  AppRun.$inject = ['$rootScope'];

  angular.module('wordgame', [
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'wordgame.welcome',
    'wordgame.game'
  ]).
  config(AppConfig)
  .run(AppRun);
})();
