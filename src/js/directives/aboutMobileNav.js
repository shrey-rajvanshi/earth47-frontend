angular.module('AboutMobileNav.Directive', []).
  directive('aboutMobileNav', ['$location','$window', '$timeout', function (location, $window, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
          $timeout(function () {
            if (location.$$path.indexOf('story') !== -1) {
              $(".about-nav-mobile-list").scrollLeft($('.nav-item-story').position().left-window.innerWidth/3);
            } else if (location.$$path.indexOf('howwefight') !== -1) {
              $(".about-nav-mobile-list").scrollLeft($('.nav-item-howwefight').position().left-window.innerWidth/3);
            } else if(location.$$path.indexOf('partners') !== -1) {
              $(".about-nav-mobile-list").scrollLeft($('.nav-item-partners').position().left-window.innerWidth/3);
            } else if(location.$$path.indexOf('faqs') !== -1) {
              $(".about-nav-mobile-list").scrollLeft($('.nav-item-faqs').position().left-window.innerWidth/3);
            } else if (location.$$path.indexOf('contact') !== -1) {
              $(".about-nav-mobile-list").scrollLeft($('.nav-item-contact').position().left-window.innerWidth/3);
            }
          });
          var offset = 330;
          angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= offset) {
              $('.aboutus-nav-mobile').addClass('about-nav-mobile-sticky');
              $('.about-common-parent').addClass('margin-top-52');
            } else {
              $('.aboutus-nav-mobile').removeClass('about-nav-mobile-sticky');
              $('.about-common-parent').removeClass('margin-top-52');
            }
          });
          $('.scroll-icon-next').click(function() {
            $(".about-nav-mobile-list").animate({scrollLeft: $('.about-nav-mobile-list').scrollLeft()+window.innerWidth/3}, 500);
          });
          $('.scroll-icon-prev').click(function() {
            $(".about-nav-mobile-list").animate({scrollLeft: $('.about-nav-mobile-list').scrollLeft()-window.innerWidth/3}, 500);
          });
          scope.setScrollPosition = function (){
            $("html, body").animate({scrollTop: offset+2}, 300);
          };
        }
      }
    };
  }]);

