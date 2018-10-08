angular.module('Footer.Directive', []).
  directive('footer', ['$window', 'ProjectsModel', function ($window, ProjectsModel) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs, controller) {
        
      },
      templateUrl: 'src/templates/footer.html',
      controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.hideFooter = $rootScope.hideFooter;
        $scope.hideNewsletter = $rootScope.hideNewsletter;
        $scope.projectsModel = new ProjectsModel().getInstance();
        $scope.goToBlog = function() {
          window.location.replace('/blog')
        };
        $scope.subscribe = function () {
          if(!newsLetterForm[0].validity.valid) {
            return;
          }
          $scope.projectsModel.subscribe({email: $scope.userEmail}).then(function () {
            $scope.showSuccessMessage = true;
          }, function(error) {
            console.log("Something went wrong");
          })
        }
      }]
    };
  }]);
