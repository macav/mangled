'use strict';

describe('wordgame.welcome module', function() {

  beforeEach(module('wordgame.welcome'));
  var scope, ctrl;

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('WelcomeCtrl', {$scope: scope});
  }));

  describe('welcome controller', function() {
    it('should have controller defined', function() {
      expect(ctrl).toBeDefined();
    });

  });
});
