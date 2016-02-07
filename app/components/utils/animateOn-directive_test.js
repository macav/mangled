'use strict';

describe('wordgame.utils module', function() {
  beforeEach(module('wordgame.utils'));

  var scope, element;
  describe('animate-on directive', function() {
    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new();
      element = $compile('<div animate-on="start-anim" animation="fadeIn"></div>')(scope);
      scope.$digest();
    }));

    it('should add animated class on scope event', inject(function($timeout) {
      expect(element.hasClass('animated')).toBeFalsy();
      scope.$emit('animate:start-anim');
      scope.$digest();
      $timeout.flush();
      expect(element.hasClass('animated')).toBeTruthy();
      expect(element.hasClass('fadeIn')).toBeTruthy();
    }));

    it('should remove animated class when animation ends', inject(function($timeout) {
      expect(element.hasClass('animated')).toBeFalsy();
      scope.$emit('animate:start-anim');
      scope.$digest();
      $timeout.flush();
      expect(element.hasClass('fadeIn')).toBeTruthy();
      element.triggerHandler('webkitAnimationEnd');
      scope.$digest();
      expect(element.hasClass('animated')).toBeFalsy();
    }));
  });
});
