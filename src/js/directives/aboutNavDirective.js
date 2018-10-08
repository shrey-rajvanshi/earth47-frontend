angular.module('AboutNav.Directive', []).
  directive('aboutNav', ['$location','$window', '$timeout', function (location, $window, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        $timeout(function () {
          if (!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i))) {
            var offset = $(".aboutus-nav-desktop").offset().top-60;
            angular.element($window).bind("scroll", function() {
              if (this.pageYOffset >= offset) {
                $('.aboutus-nav-desktop').addClass('about-stikcy-nav');
                $('.about-common-parent').addClass('padding-top-50');
              } else {
                $('.aboutus-nav-desktop').removeClass('about-stikcy-nav');
                $('.about-common-parent').removeClass('padding-top-50');
              }
            });
            scope.setScrollPosition = function (){
              $("html, body").animate({scrollTop: offset+2}, 300);
            };
          }
        });
      }
    };
  }]);
