(function() {
  'use strict';

  function RequestFocus($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        attrs.$observe('requestFocus', function (value) {
          if (value) {
            $timeout(function() {
              element[0].focus();
            });
          }
        });
      }
    };
  }
  RequestFocus.$inject = ['$timeout'];

  angular.module('wordgame.utils')
  .directive('requestFocus', RequestFocus);
})();
