(function (angular) {
  'use strict';
  var module = angular.module('ProjectsListing.Controller', ['Projects.Model']);
  module.controller('projectsListingController', [
    '$scope',
    '$http',
    '$location',
    'ProjectsModel',
    '$rootScope',
    function ($scope, $http, $location, ProjectsModel, $rootScope) {
      $scope.projectsModel = new ProjectsModel().getInstance();
      $rootScope.fullViewLoader.showLoader();
      $scope.projectsModel.getProjects().then(function() {
        $rootScope.fullViewLoader.hideLoader();
        $scope.projectsArray = $scope.projectsModel.projects;
        $scope.projectsArray.forEach(function (project) {
          project.goal_acheived = Math.round(project.achieved_funding/project.target_funding*100)+'%';
        });
      });
      function convertToSlug(Text) {
        return Text
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'')
          ;
      }
      $scope.showCardDetails = function (id) {
        var projectName = '';
        $scope.projectsArray.forEach(function (project) {
          if (project.id === id) {
            $scope.projectsModel.projectSelected = project;
            projectName = project.title;
          }
        });
        $location.url('project/'+id+'/'+convertToSlug(projectName));
      };
      $scope.contributeToAll = function () {
        $location.url('project/payment/');
      };
    }
  ]);
})(angular);
