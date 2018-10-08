(function (angular) {
  'use strict';
  var module = angular.module('BlogsCorousel.Directive', [
    'slickCarousel'
  ]);

  module.directive('blogsCorousel', ['ProjectsModel',
    function (ProjectsModel) {
      return {
        scope: {
          projects: "="
        },
        link: function (scope, element, attrs) {
          
        },
        controller: ['$scope', '$http', function ($scope, $http) {
          $scope.projectsModel = new ProjectsModel().getInstance();
          $scope.slickConfig = {
            enabled: true,
            autoplay: false,
            dots: window.innerWidth <=768 ? true : false,
            arrows: window.innerWidth > 768 ? true : false,
            draggable: false,
            slidesToShow: window.innerWidth >= 1246 ? 3 : (window.innerWidth >= 768 ? 2 : 1),
            method: {},
            event: {
              beforeChange: function (event, slick, currentSlide, nextSlide) {
                
              }
            }
          };

          $scope.getBlogs = function () {
            $scope.projectsModel.getBlogs().then(function (data) {
              $scope.blogs = data.blogs;
            });
          };
          $scope.getBlogs();
        }],
        templateUrl: 'src/templates/blogsCorousel.html'
      };
    }]);
})(angular);
