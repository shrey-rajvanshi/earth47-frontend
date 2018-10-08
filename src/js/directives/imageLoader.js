(function (angular) {
  'use strict';
  var module = angular.module('imageLoader', []);

  module.directive('imageLoader', [ '$rootScope', function () {
    return {
      scope: {
        
      },
      link: function (scope, element, attrs) {
        
      },
      controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
        $(document).ready(function(){
          $rootScope.fullViewLoader.showLoader();
          var totalImages = $(".image-load").length;
          var iLoaded = 0;
          $(".image-load").each(function () {
            console.log("here1");
            
            $(this).bind("load", function() {
              console.log("here2");
              if (iLoaded < totalImages) {
                console.log("here3");
                iLoaded++;
                if(iLoaded == totalImages){
                  $rootScope.fullViewLoader.hideLoader();
                }
                $(this).attr('src', $(this).attr("src"));
              } else {
                $('html').unbind('load')
              }
            });
          });
        });
      }]
    };
  }]);
})(angular);