'use strict';

describe('wordgame.game module', function() {

  beforeEach(module('wordgame.game'));

  describe('game controller', function() {
    var scope, ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('GameCtrl', {$scope: scope});
    }));

    it('should have controller defined', function() {
      expect(ctrl).toBeDefined();
    });

  });
});
