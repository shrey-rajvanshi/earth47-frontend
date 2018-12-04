angular.module('DesktopNav.Directive', []).
  directive('desktopnav', ['$window', 'ProjectsModel', function ($window, ProjectsModel) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs, controller) {
        if (!attrs.footer) {
          angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 12) {
              $('.nav-wrap').addClass('sticky-nav');
              $('.navbar-default.main-nav').removeClass('nav-padding-top');
              $('.nav-wrap').addClass('nav-wrap-height');
              $('.navbar-default.main-nav').addClass('nav-padding-top-6');
              //var opacity = 1 - (136 - this.pageYOffset)/136;
              //$(".sticky-nav").css("background-color", "rgba(255,255,255," + opacity + ")");
            } else {
              element.find('nav').removeClass('sticky-nav');
              $('.nav-wrap').removeClass('sticky-nav');
              $('.navbar-default.main-nav').addClass('nav-padding-top');
              $('.nav-wrap').removeClass('nav-wrap-height');
              $('.navbar-default.main-nav').removeClass('nav-padding-top-6');
            }
          });
        }
        scope.projectsModel = new ProjectsModel().getInstance();
        scope.projectsModel.getSession().then(function (data) {
          if (data.user && data.user_id) {
            scope.showUserIcon = true;
          }
          if (scope.showUserIcon && data.user.picture_link) {
            scope.profilePicLink = data.user.picture_link;
          }
        });

        function logout () {
          scope.projectsModel.logout().then(function () {
            window.location.reload();
            console.log("successfull logout ")
          });
        }
        $(".logout-dropdown").hide();
        $('.logout-dropdown-icon').click(function(e) {
          e.stopPropagation();
          $(".logout-dropdown").show();
        });

        $(document).click(function(){
          $(".logout-dropdown").hide();
        });

        $(".logout-dropdown").click(function(e){
          e.stopPropagation();
          logout();
        });
      },
      templateUrl: 'src/templates/desktopNav.html',
      controller: ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {
        $scope.hideMainNav = $rootScope.hideMainNav;
        $scope.goToBlog = function() {
          window.location.replace('/blog')
        };
      }]
    };
  }]);
