angular.module('stickyNav', []).
  directive('stickyNav', ['$window','$timeout', function ($window, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        $timeout(function () {
          var isMobile = false;
          var navOffset = $(".project-detail-nav").offset().top-60;
          if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
            isMobile = true;
          }
          var projectImpactOffset = isMobile ? $(".project-impact").offset().top-120: $(".project-impact").offset().top - 80;
          var projectChallengesOffset = isMobile ? $(".project-challenges").offset().top-140: $(".project-challenges").offset().top - 100;
          var projectVerificationOffset = isMobile ? $(".project-verification").offset().top-140 : $(".project-verification").offset().top -100;
          element.css({'width': $('.project-detail-main-block').width()});
          scope.scrollTo = function(selector) {
            var scrollPostion = $(".project-"+selector).offset().top-70;
            if (selector === 'impact') {
              scrollPostion = projectImpactOffset + 20;
            } else if (selector === 'challenges') {
              scrollPostion = projectChallengesOffset + 20;
            } else if (selector === 'verification') {
              scrollPostion = projectVerificationOffset + 20;
            }
            $("html, body").animate({scrollTop: scrollPostion}, 200);
          };
          angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= navOffset) {
              if (isMobile) {
                element.addClass('sticky-project-nav-mobile');
                $('.details-padding').addClass('padding-top-40');
              } else {
                element.addClass('sticky-project-nav');
                $('.details-padding').addClass('padding-top-60');
              }
            } else {
              if (isMobile) {
                element.removeClass('sticky-project-nav-mobile');
                $('.details-padding').removeClass('padding-top-40');
              } else {
                element.removeClass('sticky-project-nav');
                $('.details-padding').removeClass('padding-top-60');
              }
            }
            if (this.pageYOffset > navOffset && this.pageYOffset < projectImpactOffset) {
              $('.nav-item-overview').addClass('active-link-overview');
              $('.nav-item-impact').removeClass('active-link-overview');
            } else if (this.pageYOffset > projectImpactOffset && this.pageYOffset < projectChallengesOffset) {
              $('.nav-item-overview').removeClass('active-link-overview');
              $('.nav-item-challenges').removeClass('active-link-overview');
              $('.nav-item-impact').addClass('active-link-overview');
            } else if (this.pageYOffset > projectChallengesOffset && this.pageYOffset < projectVerificationOffset) {
              $('.nav-item-impact').removeClass('active-link-overview');
              $('.nav-item-verification').removeClass('active-link-overview');
              $('.nav-item-challenges').addClass('active-link-overview');
            } else if (this.pageYOffset > projectVerificationOffset) {
              $('.nav-item-challenges').removeClass('active-link-overview');
              $('.nav-item-verification').addClass('active-link-overview');
            }
          });
        }, 1500);
      }
    };
  }]);
