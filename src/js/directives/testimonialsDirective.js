(function (angular) {
  'use strict';
  var module = angular.module('Testimonials.Directive', [
    'slickCarousel'
  ]);

  module.directive('testimonials', [
    function () {
      return {
        scope: {
          projects: "="
        },
        link: function (scope, element, attrs) {
          console.log("Dd")
        },
        controller: ['$scope', function ($scope) {
        
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
        }],
        templateUrl: 'src/templates/testimonialsCorousel.html'
      };
    }]);
})(angular);
