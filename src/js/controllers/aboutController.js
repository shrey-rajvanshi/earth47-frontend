(function (angular) {
  'use strict';
  var module = angular.module('About.Controller', [
    'slickCarousel',
    'ProjectsWeSupport.Directive',
    'AboutNav.Directive',
    'Projects.Model',
    'AboutMobileNav.Directive'
  ]);
  module.controller('aboutController', [
    '$scope',
    'ProjectsModel',
    function ($scope, ProjectsModel) {
      $scope.projectsModel = new ProjectsModel().getInstance();
      $scope.showForm = true;
      $scope.window = window;
      $scope.continueReading = function () {
        $('.read-more-wrap').css({'display': 'block'});
        $('.continue-reading-block').css({'display': 'none'});
      };
      $scope.submitForm = function () {
        var payload = {
          name: contactUsForm.name.value,
          email: contactUsForm.email.value,
          phone: contactUsForm.phone.value,
          message: contactUsForm.message.value
        }
        $scope.projectsModel.submitContactForm(payload).then(function () {
          $scope.success = true;
          $scope.showForm = false;
        }, function () {
          console.log("Something went wrong.")
        });

        $scope.successDone = function () {
          $scope.showForm = true;
          $scope.success = false;
          contactUsForm.name.value = null;
          contactUsForm.email.value = null;
          contactUsForm.phone.value = null;
          contactUsForm.message.value = null;
        }
      }
    }
  ]);
})(angular);
