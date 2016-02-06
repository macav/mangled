(function() {
  'use strict';

  function ProfileService($window) {
    var _userData = {};

    return {
      setUsername: function(username) {
        _userData.username = username;
        $window.sessionStorage.username = username;
      },
      getUsername: function() {
        if (!_userData.username && $window.sessionStorage.username) {
          _userData.username = $window.sessionStorage.username;
        }
        return _userData.username;
      }
    };
  }
  ProfileService.$inject = ['$window'];

  angular.module('wordgame.game')
  .factory('Profile', ProfileService);
})();
