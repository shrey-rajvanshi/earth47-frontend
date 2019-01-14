angular.module('MobileSideNav.Directive', []).
  directive('mobileSideNav', ['$window', function ($window) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs, controller) {
        $( "#hamburger-icon" ).on( "click", function() {
          event.stopPropagation();
          $('.side-mnav').addClass('side-mnav-width')
        });
        $('html').click(function() {
          if($('.side-mnav').hasClass('side-mnav-width')) {
            $('.side-mnav').removeClass('side-mnav-width')
          }
        });

        $('.side-mnav').click(function(event){
          event.stopPropagation();
        });
      },
      templateUrl: 'src/templates/mobileSideNav.html',
      controller: ['$scope', '$rootScope', '$state', 'ProjectsModel', function ($scope, $rootScope, $state, ProjectsModel) {
        $scope.showAboutusOptions = false;

        $scope.hideNav = function () {
          if($('.side-mnav').hasClass('side-mnav-width')) {
            $('.side-mnav').removeClass('side-mnav-width')
          }
        };

        $scope.toggleAboutusOptions = function () {
          $scope.showAboutusOptions = !$scope.showAboutusOptions;
        };

        $scope.goToBlog = function() {
          window.location = "https://blog.earth47.com"
        };
        $scope.projectsModel = new ProjectsModel().getInstance();
        $scope.projectsModel.getSession().then(function (data) {
          if (data.user_id) {
            $scope.showLogout = true;
          }
        });
        $scope.logout = function() {
          $scope.projectsModel.logout().then(function () {
            window.location.reload();
            console.log("successfull logout ")
          });
        }
      }]
    };
  }]);
