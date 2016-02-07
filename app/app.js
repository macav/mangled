(function() {
  'use strict';

  function appConfig($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }
  appConfig.$inject = ['$urlRouterProvider'];

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
    'wordgame.welcome',
    'wordgame.game'
  ]).
  config(appConfig)
  .run(AppRun);
})();
