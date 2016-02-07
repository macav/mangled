'use strict';

describe('wordgame.welcome module', function() {
  beforeEach(module('wordgame.welcome'));
  beforeEach(module('wordgame.game'));

  var testData = {
    highscores: []
  };
  for (var i = 0; i < 20; i++) {
    testData['highscores'].push({
      username: 'player'+i,
      score: i
    });
  }
  beforeEach(function(){
    jasmine.addMatchers({
      toEqualData: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            return {
              pass: angular.equals(actual, expected)
            };
          }
        };
      }
    });
  });
  var scope, rootScope, ctrl, $httpBackend, state;

  beforeEach(inject(function($rootScope, $controller, $state, $window) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    state = $state;
    ctrl = $controller('WelcomeCtrl', {$scope: scope, highscores: testData['highscores']});
    delete $window.sessionStorage.username;
    spyOn(state, 'go');
  }));

  describe('welcome controller', function() {
    it('should have controller defined', function() {
      expect(ctrl).toBeDefined();
    });

    it('should load username from session storage', inject(function($controller, $rootScope, $window) {
      $window.sessionStorage.username = 'player1';
      var tmpCtrl = $controller('WelcomeCtrl', {$scope: scope, highscores: testData['highscores']});
      expect(tmpCtrl.username).toBe('player1');
    }));

    it('should load highscores', function() {
      expect(ctrl.highscores).toBeDefined();
      expect(ctrl.highscores.length).toBe(testData['highscores'].length);
      expect(ctrl.highscores).toEqualData(testData['highscores']);
    });

    it('should redirect to game when a name is submitted', function() {
      ctrl.username = 'martin';
      ctrl.startGame();
      rootScope.$digest();
      expect(state.go).toHaveBeenCalled();
    });

    it('should save username to profile service', inject(function(Profile) {
      ctrl.username = 'martin';
      ctrl.startGame();
      rootScope.$digest();
      expect(Profile.getUsername()).toEqual('martin');
    }));

    it('should not redirect to game without a name', function() {
      ctrl.username = '';
      ctrl.startGame();
      rootScope.$digest();
      expect(state.go).not.toHaveBeenCalled();
    });

  });
});
