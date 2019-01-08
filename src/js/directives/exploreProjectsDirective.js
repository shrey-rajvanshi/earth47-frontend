(function (angular) {
  'use strict';
  var module = angular.module('ExploreProjects.Directive', [
    'slickCarousel'
  ]);

  module.directive('exploreProjects', [
    function () {
      return {
        scope: {
          projects: "="
        },
        link: function (scope, element, attrs) {
          
        },
        controller: ['$scope', '$http', '$stateParams','$location' , '$rootScope', function ($scope, $http, $stateParams, $location, $rootScope) {
          var isMobile = false;
          if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
            isMobile = true;
          }
          $scope.slickConfig = {
            enabled: true,
            slidesToScroll: 1,
            infinite: true,
            autoplay: false,
            dots: window.innerWidth <= 768 ? true : false,
            arrows: window.innerWidth > 768 ? true : false,
            draggable: false,
            slidesToShow: window.innerWidth >= 1246 ? 3 : (window.innerWidth >= 768 ? 2 : 1),
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
          $rootScope.fullViewLoader.showLoader();
          $http({
            method: 'GET',
            url: 'http://api.earth47.com/api/projects',
          }).then(function(response) {
            $scope.projectsArray = response.data.projects;
            $scope.projectsArray = $scope.projectsArray.filter(function (project) {
              return project.id != $stateParams.projectId;
            });
            $rootScope.fullViewLoader.hideLoader();
          }, function (response) {
            console.log("Failed to fetch projects");
            $rootScope.fullViewLoader.hideLoader();
          });
          $scope.goToProjectDetail = function (projectId, projectTitle) {
            $location.url('project/'+projectId+'/'+convertToSlug(projectTitle));
          };
        }],
        templateUrl: 'src/templates/exploreProjects.html'
      };
    }]);
})(angular);
