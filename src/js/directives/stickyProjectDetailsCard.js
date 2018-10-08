angular.module('stickyCard', []).
  directive('stickyCard', ['$window','$timeout', function ($window, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        $timeout(function () {
          var cardOffset = $(".project-progress-card").offset().top-60;
          var projectProgressCardHeight = $(".project-progress-card").height();
          var exploreOtherProjectsOffset = $(".explore-other-projects").offset().top-60;
          angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= cardOffset && this.pageYOffset <= exploreOtherProjectsOffset - projectProgressCardHeight) {
              element.addClass('sticky-card');
              element[0].style.removeProperty('margin-top');
              element[0].style.removeProperty('position');
            } else if (this.pageYOffset > exploreOtherProjectsOffset - projectProgressCardHeight) {
              element.css({'position': 'absolute', 'margin-top': $(".project-detail-main-block").height() - projectProgressCardHeight - 120 +'px'});
            } 
            else {
              element[0].style.removeProperty('margin-top');
              element[0].style.removeProperty('position');
              element.removeClass('sticky-card');
            }
          });
        }, 1500);
      }
    };
  }]);
