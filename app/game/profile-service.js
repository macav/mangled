(function() {
  'use strict';

  function ProfileService() {
    var _userData = {};

    return {
      setUsername: function(username) {
        _userData.username = username;
      },
      getUsername: function() {
        return _userData.username;
      }
    };
  }

  angular.module('wordgame.game')
  .factory('Profile', ProfileService);
})();
