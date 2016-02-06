'use strict';

describe('wordgame.game module', function() {
  beforeEach(module('wordgame.game'));

  var Profile;

  beforeEach(inject(function(_Profile_) {
    Profile = _Profile_;
  }));

  describe('profile service', function() {
    beforeEach(inject(function($window) {
      delete $window.sessionStorage.username;
    }));
    it('should remember username', function() {
      Profile.setUsername('test1');
      expect(Profile.getUsername()).toEqual('test1');
    });

    it('should remember username in session storage', inject(function($window) {
      Profile.setUsername('test1');
      expect($window.sessionStorage.username).toBe('test1');
    }));

    it('should load username from session storage if it is present there', inject(function($window) {
      expect(Profile.getUsername()).toBeUndefined();
      $window.sessionStorage.username = 'test1';
      expect(Profile.getUsername()).toBe('test1');
    }));
  });
});
