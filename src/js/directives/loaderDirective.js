(function (angular) {
  'use strict';
  var module = angular.module('loaderDirective', []);

  module.directive('fullpageLoader', [ '$rootScope', function () {
      return {
        scope: {
          
        },
        link: function (scope, element, attrs) {
          
        },
        controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
          function loaderObject() {
            this.requestsCount = 0;
            this.showLoader = function () {
              $scope.loaderVisible = true;
              this.requestsCount++;
            }
            this.hideLoader = function () {
              console.log("loader fal2se")
              if (this.requestsCount) {
                this.requestsCount--;
                if (!this.requestsCount) {
                  console.log("loader false")
                  $scope.loaderVisible = false;
                }
              }
            }
          }
          $rootScope.fullViewLoader = new loaderObject();
          $scope.loaderVisible = false;
        }],
        templateUrl: 'src/templates/loaderOverlay.html'
      };
    }]);
})(angular);