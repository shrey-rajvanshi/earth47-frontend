(function (angular) {
  'use strict';
  var module = angular.module('ProjectDetail.Controller', [
    'stickyCard',
    'Projects.Model',
    'ExploreProjects.Directive',
    'stickyNav'
  ]);
  module.controller('projectDetailController', [
    '$scope',
    '$stateParams',
    '$location',
    '$http',
    'ProjectsModel',
    '$rootScope',
    function ($scope, $stateParams, $location, $http, ProjectsModel, $rootScope) {
      $scope.projectId = $stateParams.projectId;
      $scope.projectsModel = new ProjectsModel().getInstance();
      $scope.currentPageUrl = window.location.href;
      if (!Object.keys($scope.projectsModel.projectSelected).length || $scope.projectsModel.projectSelected.id !== $scope.projectId) {
        $rootScope.fullViewLoader.showLoader();
        $scope.projectsModel.getProjectById($scope.projectId).then(function () {
          $scope.projectObject = $scope.projectsModel.projectSelected;
          $scope.projectObject.goal_acheived = Math.round($scope.projectObject.achieved_funding/$scope.projectObject.target_funding*100)+'%';
          $scope.projectObject.activeImageIndex = 0;
          $rootScope.fullViewLoader.hideLoader();
        });
      } else {
        $scope.projectObject = $scope.projectsModel.projectSelected;
        $scope.projectObject.activeImageIndex = 0;
      }

      $scope.toggleImage = function(next) {
        if(next) {
          $scope.projectObject.activeImageIndex += 1;
          return;
        }
        $scope.projectObject.activeImageIndex -= 1;
      };
      function convertToSlug(Text) {
        return Text
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'')
          ;
      }
      $scope.backThisProject = function () {
        $location.url('project/payment/'+$scope.projectObject.id+'/'+convertToSlug($scope.projectObject.title));
      };

      $scope.shareOnFb = function (e) {
        e.preventDefault();
        FB.ui({
          method: 'share_open_graph',
          action_type: 'og.shares',
          display: 'popup',
          action_properties: JSON.stringify({
          object: {
            'og:url': window.location.href,
            'og:title': 'Build the world you wish to live in',
            'og:description': 'Offset your carbon footprint by supporting greenhouse gas reducing projects on Earth 47. Every contributions fights climate and helps build a better tomorrow',
            'og:image': 'https://www.earth47.com/src/images/illustrations/social-media-sharing.png',
            'og:image:width': '700',
            'og:image:height': '700'
          }
        })
        });
      };
    }
  ]);
})(angular);
