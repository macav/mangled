(function() {
  'use strict';

  function View1Config($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  };
  View1Config.$inject = ['$routeProvider'];
  
  function View1Ctrl() {

  };

  angular.module('myApp.view1', ['ngRoute'])

  .config(View1Config)

  .controller('View1Ctrl', View1Ctrl);
})();