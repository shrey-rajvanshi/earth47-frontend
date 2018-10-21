(function (angular) {
  'use strict';
  var module = angular.module('earth47App', [
    'ui.router',
    'Home.Controller',
    'SolarHome.Controller',
    'About.Controller',
    'ProjectsListing.Controller',
    'ProjectDetail.Controller',
    'ProjectPayment.Controller',
    'activeLink',
    'DesktopNav.Directive',
    'Footer.Directive',
    'MobileSideNav.Directive',
    'ngSanitize',
    'Thankyou.Controller',
    'loaderDirective',
    'imageLoader'
  ]);
  module.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function function_name($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider  
        .state('home', {
          url: '/',
          templateUrl: 'src/templates/home.html',
          controller: 'homeController'
        }).state('solarhome', {
          url: '/solar',
          templateUrl: 'src/templates/solarHome.html',
          controller: 'solarHomeController'
        }).state('about', {
          url: '/about',
          templateUrl: 'src/templates/about.html',
          controller: 'aboutController',
          redirectTo: 'about.ourStory'
        }).state('about.ourStory', {
          url: '/story',
          templateUrl: 'src/templates/ourStory.html'
        }).state('about.howWeFight', {
          url: '/howwefight',
          templateUrl: 'src/templates/howWeFight.html'
        }).state('about.partners', {
          url: '/partners',
          templateUrl: 'src/templates/ourPartners.html'
        }).state('about.faqs', {
          url: '/faqs',
          templateUrl: 'src/templates/faqs.html'
        }).state('about.contactUs', {
          url: '/contact',
          templateUrl: 'src/templates/contactus.html'
        }).state('projects', {
          url: '/projects',
          templateUrl: 'src/templates/projectsListing.html',
          controller: 'projectsListingController'
        }).state('projectDetails', {
          url: '/project/:projectId/:projectSlug',
          templateUrl: 'src/templates/projectDetail.html',
          controller: 'projectDetailController'
        }).state('projectPayment', {
          url: '/project/payment/:projectId/:projectSlug',
          templateUrl: 'src/templates/projectPayment.html',
          params: {
            projectId: { squash: true, value: null },
            projectSlug: { squash: true, value: null }
          },
          controller: 'projectPaymentController'
        }).state('termsConditions', {
          url: '/terms',
          templateUrl: 'src/templates/termsConditions.html'
        }).state('privacyPolicy', {
          url: '/privacypolicy',
          templateUrl: 'src/templates/privacyPolicy.html'
        }).state('refundPolicy', {
          url: '/refundpolicy',
          templateUrl: 'src/templates/refundPolicy.html'
        }).state('thankyou', {
          url: '/thankyou',
          templateUrl: 'src/templates/thankyou.html',
          controller: 'thankyou'
        })

      $urlRouterProvider.otherwise("/");
      $locationProvider.html5Mode(true);
    }]);
  module.run([
    '$rootScope',
    '$state',
    function ($rootScope, $state) {
      $rootScope.hideFooter = false;
      $rootScope.hideMainNav = false;
      $rootScope.$watch(function(){
        return $state.$current.name
      }, function(newVal, oldVal){
          $rootScope.hideNewsletter = false;
          if (newVal && (newVal.indexOf('projectPayment') !== -1 ||
            newVal.indexOf('termsConditions') !== -1 || newVal.indexOf('privacyPolicy') !== -1 || newVal.indexOf('refundPolicy') !== -1)) {
            $rootScope.hideFooter = true;
            $rootScope.hideMainNav = true;
          } else if (newVal && newVal.indexOf('projectDetails') !== -1) {
            $rootScope.hideFooter = true;
            $rootScope.hideMainNav = false;
          } else if (newVal && newVal.indexOf('thankyou') !== -1) {
            $rootScope.hideNewsletter = true;
          } else {
            $rootScope.hideFooter = false;
            $rootScope.hideMainNav = false;
          }
      }) 
  }]);
})(angular);
