'use strict';

describe('wordgame.game module', function() {
  beforeEach(module('wordgame.game'));

  var Profile;

  beforeEach(inject(function(_Profile_) {
    Profile = _Profile_;
  }));

  describe('profile server', function() {
    it('should remember username', function() {
      Profile.setUsername('test1');
      expect(Profile.getUsername()).toEqual('test1');
    });
  });
});
