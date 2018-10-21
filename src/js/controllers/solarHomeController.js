(function (angular) {
  'use strict';
  var module = angular.module('SolarHome.Controller', [
    'ProjectsWeSupport.Directive',
    'Testimonials.Directive',
    'BlogsCorousel.Directive'
  ]);
  module.controller('solarHomeController', [
    '$scope',
    '$location',
    '$rootScope',
    function ($scope, $location, $rootScope) {
      $scope.goToViewProjects = function () {
        $location.url('projects');
      };
      $scope.goToHowThisWorks = function () {
        $location.url('about/howwefight');
      };
      console.log($rootScope.fullViewLoader)
    }
  ]);
})(angular);
