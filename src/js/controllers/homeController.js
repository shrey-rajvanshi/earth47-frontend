(function (angular) {
  'use strict';
  var module = angular.module('Home.Controller', [
    'ProjectsWeSupport.Directive',
    'Testimonials.Directive',
    'BlogsCorousel.Directive'
  ]);
  module.controller('homeController', [
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
