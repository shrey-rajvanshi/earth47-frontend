(function (angular) {
  'use strict';
  var module = angular.module('LoginModal.Directive', []);

  module.directive('loginModal', [
    function () {
      return {
        scope: {
            hideLoginModal: '&'
        },
        link: function (scope, element, attrs) {

          scope.loginWithFacebook = function () {
            window.open('http://www.earth47.com/api/authorize/facebook', '_parent');
          };

          scope.loginWithGoogle = function () {
            window.open('http://www.earth47.com/api/authorize/google', '_parent');
          };

          scope.callHideModal = function () {
            scope.hideLoginModal();
          }
        },
        templateUrl: 'src/templates/loginModal.html'
      };
    }]);
})(angular);
