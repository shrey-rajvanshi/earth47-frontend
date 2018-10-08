angular.module('activeLink', []).
  directive('activeLink', ['$location', function (location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var activeClass = attrs.activeLink;
        var path = attrs.navState;
        scope.location = location;
        if (location.$$path.indexOf(path) !== -1 || (path === 'home' && location.$$path === '/') || (path === 'projects' && location.$$path === '/thankyou')) {
          element.addClass(activeClass);
        }
        scope.$watch('location.$$path', function (newPath) {
          if (newPath.indexOf(path) !== -1 || (path === 'home' && location.$$path === '/') || (path === 'projects' && location.$$path === '/thankyou')) {
            element.addClass(activeClass);
          } else {
            element.removeClass(activeClass);
          }
        });
      }
    };
  }]);
