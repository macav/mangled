(function() {
  'use strict';

  function View2Config($routeProvider) {
    $routeProvider.when('/view2', {
      templateUrl: 'view2/view2.html',
      controller: 'View2Ctrl'
    });
  };
  View2Config.$inject = ['$routeProvider'];

  function View2Ctrl() {

  };

  angular.module('myApp.view2', ['ngRoute'])

  .config(View2Config)

  .controller('View2Ctrl', View2Ctrl);
})();