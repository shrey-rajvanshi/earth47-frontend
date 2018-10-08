(function (angular) {
  'use strict';
  var module = angular.module('Projects.Model', [
    
  ]);
  module.factory('ProjectsModel', [
    '$http',
    function ($http) {
      var currentData = '',
        manipulator,
        baseUrl = 'https://www.earth47.com/api'

      function ProjectsModel() {
        this.projects = [];
        this.projectSelected = {};
        this.amountDonated = 0;
      }

      ProjectsModel.prototype = (function () {

        function getProjects() {
          var self = this;
          return $http({
            method: 'GET',
            url: baseUrl + '/projects',
          }).then(function(response) {
            self.projects = response.data.projects;
          }, function (response) {
            console.log("Failed to fetch projects")
          });
        }

        function getProjectById(id) {
          var self = this;
          return $http({
            method: 'GET',
            url: baseUrl + '/project/' + id,
          }).then(function(response) {
            self.projectSelected = response.data.project;
          }, function (response) {
            console.log("Failed to fetch project")
          });
        }
        
        function getBackersByProjectId(id) {
          return $http({
            method: 'GET',
            url: baseUrl + '/backers/' + id,
          }).then(function(response) {
            return response.data.backers;
          }, function (response) {
            console.log("Failed to fetch backers")
          });
        }

        function getAmountEnteredImpact(amount, object) {
          return $http({
            method: 'GET',
            url: baseUrl + '/impact/' + amount + '/' + object,
          }).then(function(response) {
            return response.data;
          }, function (response) {
            console.log("Failed to fetch impact")
          });
        }

        function postSession(projectId, amount, paymentOption) {
          return $http({
            method: 'POST',
            url: baseUrl + '/intent',
            data: {project_id: projectId, amount: amount, payment_option: paymentOption}
          }).then(function(response) {
            return response.data;
          }, function (response) {
            console.log("Failed to fetch impact")
          });
        }

        function getSession() {
          return $http({
            method: 'GET',
            url: baseUrl + '/session',
          }).then(function(response) {
            return response.data;
          }, function (response) {
            console.log("Failed to fetch impact")
          });
        }

        function postPaymentDetails(payload) {
          return $http({
            method: 'POST',
            url: baseUrl + '/paymentdetails',
            data: payload
          }).then(function(response) {
            return response.data;
          }, function (response) {
            console.log("Failed to fetch impact")
          });
        }

        function submitContactForm(payload) {
          return $http({
            method: 'POST',
            url: baseUrl + '/contact',
            data: payload
          }).then(function(response) {
            return response.data;
          }, function (response) {
            console.log("Failed to fetch impact")
          });
        }

        function logout() {
          return $http({
            method: 'GET',
            url: baseUrl + '/logout',
          }).then(function(response) {
            return response.data;
          }, function (response) {
            console.log("Failed to fetch impact")
          });
        }

        function subscribe(payload) {
          return $http({
            method: 'POST',
            url: baseUrl + '/subscribe',
            data: payload
          }).then(function(response) {
            return response.data;
          }, function (response) {
            console.log("Failed to fetch impact")
          });
        }

        function getBlogs() {
          return $http({
            method: 'GET',
            url: baseUrl + '/blogs',
          }).then(function(response) {
            return response.data;
          }, function (response) {
            console.log("Failed to fetch impact")
          });
        }

        return {
          getProjects: getProjects,
          getProjectById: getProjectById,
          getBackersByProjectId: getBackersByProjectId,
          getAmountEnteredImpact: getAmountEnteredImpact,
          postSession: postSession,
          getSession: getSession,
          postPaymentDetails: postPaymentDetails,
          submitContactForm: submitContactForm,
          subscribe: subscribe,
          logout: logout,
          getBlogs: getBlogs
        };       
      })();

      manipulator = {
        getNewInstance: function () {
          var ci = new ProjectsModel();
          currentData = ci;
          return ci;

        },
        getInstance: function () {
          if (currentData === '') {
            this.getNewInstance();
          }
          return currentData;
        }
      };

      return function () {
        return manipulator;
      };
    }
  ]);
})(angular);
