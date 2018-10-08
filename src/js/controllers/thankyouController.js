(function (angular) {
  'use strict';
  var module = angular.module('Thankyou.Controller', [
    'Projects.Model'
  ]);
  module.controller('thankyou', [
    '$scope',
    '$location',
    'ProjectsModel',
    function ($scope, $location, ProjectsModel) {
      $scope.projectsModel = new ProjectsModel().getInstance();
      $scope.amountDonated = $scope.projectsModel.amountDonated;
    }
  ]);
})(angular);
