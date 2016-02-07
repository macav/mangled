(function() {
  'use strict';

  function AnimateOn($timeout) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        attrs.$observe('animateOn', function (value) {
          if (value && attrs.animation) {
            scope.$on('animate:'+value, function() {
              if (element.hasClass('animated')) {
                element.removeClass('animated '+attrs.animation);
              }
              $timeout(function() {
                element.addClass('animated '+attrs.animation);
                element.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                  element.removeClass('animated '+attrs.animation);
                });
              });
            });
          }
        });
      }
    };
  }
  AnimateOn.$inject = ['$timeout'];

  angular.module('wordgame.utils')
  .directive('animateOn', AnimateOn);
})();
