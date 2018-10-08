(function (angular) {
  'use strict';
  var module = angular.module('ProjectsWeSupport.Directive', [
    'slickCarousel',
  ]);

  module.directive('projectsWeSupport', [ '$rootScope', function ($rootScope) {
    return {
      scope: {
        projects: "="
      },
      link: function (scope, element, attrs) {},
      controller: ['$scope', '$http', '$location', function ($scope, $http, $location) {
        var isMobile = false;
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
          isMobile = true;
        }
        $rootScope.fullViewLoader.showLoader();
        $http({
          method: 'GET',
          url: 'https://www.earth47.com/api/projects',
        }).then(function(response) {
          $scope.projectsArray = response.data.projects;
          $scope.projectArray = $scope.projectsArray.map(function (project) {
            return project.goal_acheived = Math.round(project.achieved_funding/project.target_funding*100)+'%';
           });
          $rootScope.fullViewLoader.hideLoader();
        }, function (response) {
          console.log("Failed to fetch projects");
          $rootScope.fullViewLoader.hideLoader();
        });
        $scope.goToViewProjects = function () {
          $location.url('projects');
        };
        $scope.slickConfig = {
          enabled: true,
          autoplay: false,
          dots: window.innerWidth <= 768 ? true : false,
          arrows: window.innerWidth > 768 ? true : false,
          draggable: false,
          method: {},
          event: {
            beforeChange: function (event, slick, currentSlide, nextSlide) {
              
            }
          }
        };
        function convertToSlug(Text) {
          return Text
            .toLowerCase()
            .replace(/ /g,'-')
            .replace(/[^\w-]+/g,'')
            ;
        }
        $scope.goToProjectDetail = function (projectId, projectTitle) {
          $location.url('project/'+projectId+'/'+convertToSlug(projectTitle));
        };
      }],
      templateUrl: 'src/templates/projectsCorousel.html'
    };
  }]);
})(angular);
