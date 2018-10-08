(function (angular) {
  'use strict';
  var module = angular.module('ProjectPayment.Controller', [
    'LoginModal.Directive',
    'Projects.Model'
  ]);
  module.controller('projectPaymentController', [
    '$scope',
    '$http',
    '$location',
    '$stateParams',
    'ProjectsModel',
    '$rootScope',
    '$timeout',
    function ($scope, $http, $location, $stateParams, ProjectsModel, $rootScope, $timeout) {
      $scope.projectId = $stateParams.projectId;
      $('[data-toggle="tooltip"]').tooltip(); 
      $scope.paymentOption = [
        {
          'caption': 'Get Started',
          'amount': 250,
          'object': 'coal',
          'type': 'get_started'
        },
        {
          'caption': 'Offset Footprint',
          'amount': 1500,
          'object': 'footprint',
          'type': 'footprint'
        },
        {
          'caption': 'Do More',
          'amount': 5000,
          'object': 'cars',
          'type': 'do_more'
        },
        {
          'caption': 'Pay as you like',
          'amount': null,
          'object': 'trees',
          'type': 'pay_as_you_like'
        }
      ];
      $scope.projectsModel = new ProjectsModel().getInstance();
      $scope.header = $scope.projectId ? $scope.projectsModel.projectSelected.title : 'EARTH 47';
      $scope.amountEntered = 1500;
      $scope.object = 'footprint';
      $scope.selectedPaymentOption = 'footprint';
      $scope.ownAmountEntered = false;
      $scope.validOwnAmount = true;
      $scope.payAnonymously = false;
      $scope.impact = {
        impact: '',
        time: '',
        co2_reduced: '',
        copy: ''
      };
      $scope.sessionObject = {};
      $scope.isMobile = false;
      if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
        $scope.isMobile = true;
      }
      $scope.showEnterOwnAmount = false;
      if ($scope.projectId && !Object.keys($scope.projectsModel.projectSelected).length) {
        $rootScope.fullViewLoader.showLoader();
        $scope.projectsModel.getProjectById($scope.projectId).then(function () {
          $scope.header = $scope.projectsModel.projectSelected.title;
          $rootScope.fullViewLoader.hideLoader();     
        });
      }
      getDefaultsImpact();
      $rootScope.fullViewLoader.showLoader();
      $scope.projectsModel.getBackersByProjectId($scope.projectId).then(function (backers) {
        $scope.backersList = backers;
        $rootScope.fullViewLoader.hideLoader();
      });
      function convertToSlug(Text) {
        return Text
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'')
          ;
      }
      $scope.goBack = function () {
        if ($scope.projectId) {
          $location.url('project/' + $scope.projectId + '/'+convertToSlug($scope.projectsModel.projectSelected.title));
        } else {
          $location.url('projects');
        }
      };
      $scope.selectPaymentOption = function (type) {
        if (type === 'pay_as_you_like') {
          $scope.showEnterOwnAmount = true;
          $scope.selectedPaymentOption = type;
          $scope.amountEntered = null;
          $scope.object = 'trees';
          $scope.validOwnAmount = false;
          $scope.errorMessage = null;
        } else {
          $scope.paymentOption.forEach(function (option, index) {
            if (option.type === type) {
              $scope.ownAmountEntered = false;
              $scope.amountEntered = option.amount;
              $scope.object = option.object;
              $scope.errorMessage = null;
              $scope.validOwnAmount = true;
              $scope.selectedPaymentOption = option.type;
              getImpact();
            }
          });
        }
        $timeout(function () {
          $scope.paymentOption.forEach(function(option) {
            if (option.type === type) {
              $('.details-block-'+type).show();
            } else {
              $('.details-block-'+option.type).hide();
            }
          });
        });
      }

      function getDefaultsImpact() {
        $scope.paymentOption.forEach(function (option) {
          if (option.type !== 'pay_as_you_like') {
            $rootScope.fullViewLoader.showLoader();
            $scope.projectsModel.getAmountEnteredImpact(option.amount, option.object).then(function (impact) {
              option.impact = impact.impact;
              option.time = impact.time;
              option.co2_reduced = impact.co2_impact;
              getImpact();
              $rootScope.fullViewLoader.hideLoader();
            });
          }
        });
      }

      function getImpact() {
        if($scope.selectedPaymentOption !== 'pay_as_you_like') {
          $scope.paymentOption.forEach(function (option) {
            if ($scope.selectedPaymentOption === option.type) {
              $scope.impact.impact = option.impact;
              $scope.impact.time = option.time;
              $scope.impact.co2_reduced = option.co2_reduced;
              getImpactCopy();
              return false;
            }
          });
        } else {
          $rootScope.fullViewLoader.showLoader();
          $scope.projectsModel.getAmountEnteredImpact($scope.amountEntered, $scope.object).then(function (impact) {
            $scope.impact.impact = impact.impact;
            $scope.impact.time = impact.time;
            $scope.impact.co2_reduced  = impact.co2_impact;
            getImpactCopy();
            $rootScope.fullViewLoader.hideLoader();
          });
        }
      }

      function getImpactCopy () {
        var co2_unit = 'ton';
        if ($scope.impact.co2_reduced < 1) {
          $scope.impact.co2_reduced = $scope.impact.co2_reduced * 1000;
          co2_unit = 'KGs';
        } else if ($scope.impact.co2_reduced > 1) {
          co2_unit = 'tons';
        }
        if ($scope.object === 'footprint') {
          $scope.impact.copy = 'Your contribution will reduce <span class="font-weight-bold font-text-color">' +  $scope.impact.co2_reduced +' '+ co2_unit + 
            ' of CO<sub>2</sub></span> emissions, which is the equivalent of your <span class="font-weight-bold font-text-color">carbon footprint for ' + Math.round($scope.impact.impact) +' '+ $scope.impact.time+'</span>.';
        } else if ($scope.object === 'coal') {
          $scope.impact.copy = 'Your contribution will reduce <span class="font-weight-bold font-text-color">' +  $scope.impact.co2_reduced +' '+co2_unit + 
            ' of CO<sub>2</sub></span>, which is the amount emitted from burning <span class="font-weight-bold font-text-color">' + Math.round($scope.impact.impact) + ' KGs of coal.</span>'; 
        } else if ($scope.object === 'cars') {
          $scope.impact.copy = 'Your contribution will reduce <span class="font-weight-bold font-text-color">' +  $scope.impact.co2_reduced +' '+co2_unit + 
            ' of CO<sub>2</sub></span> emissions, which is the equivalent of taking '; 
          if ($scope.impact.time === 'years') {
            var impactValue = Math.round($scope.impact.impact);
            var objectValue = impactValue > 1 ? 'cars': 'car';
            $scope.impact.copy += '<span class="font-weight-bold font-text-color">' + impactValue + ' ' + objectValue + ' off the road for 1 year.</span>';
          } else {
            $scope.impact.copy += '<span class="font-weight-bold font-text-color">1 car off the road for ' + Math.round($scope.impact.impact) + ' ' + $scope.impact.time + '</span>.';
          }
        } else if ($scope.object === 'trees') {
          $scope.impact.copy = 'Your contribution will reduce <span class="font-weight-bold font-text-color">' +  $scope.impact.co2_reduced +' '+co2_unit + 
            ' of CO<sub>2</sub></span> emissions, which is the amount absorbed by '; 
          var impactValue = Math.round($scope.impact.impact);
          if ($scope.impact.time === 'years') {
            var objectValue = impactValue > 1 ? 'trees': 'tree';
            $scope.impact.copy += '<span class="font-weight-bold font-text-color">' + impactValue + ' white oak '+objectValue+' in 1 year.</span>';
          } else {
            var objectValue = impactValue > 1 ? $scope.impact.time : $scope.impact.time.slice(0, -1);;
            $scope.impact.copy += '<span class="font-weight-bold font-text-color">1 white oak tree in ' + impactValue + ' ' + objectValue + '</span>.';
          }
        }
      }

      $scope.hideEnterOwnAmountBlock = function () {
        $scope.showEnterOwnAmount = false;
        $scope.ownAmountEntered = true;
        if (!$scope.validOwnAmount) {
          $scope.selectPaymentOption('footprint');
        }
      }

      $scope.validateEnteredAmount = function (amountEntered) {
        if (amountEntered < 100) {
          $scope.validOwnAmount = false;
          $scope.errorMessage = 'Please enter amount greater than 100';
          return;
        } else {
          $scope.errorMessage = null;
          $scope.validOwnAmount = true;
          $scope.amountEntered = amountEntered;
          getImpact();
        }
      }

      function getSession (isLogin) {
        $rootScope.fullViewLoader.showLoader();
        $scope.projectsModel.getSession().then(function (data) {
          $rootScope.fullViewLoader.hideLoader();
          if (data.user_id) {
            if (data.user) {
              $scope.showUserIcon = true;
            }
            if (data.user && data.user.picture_link) {
              $scope.profilePicLink = data.user.picture_link;
            }
            $scope.sessionObject.amount = data.amount;
            $scope.sessionObject.project_id = data.project_id;
            $scope.sessionObject.user_id = data.user_id;
            $scope.sessionObject.user = data.user;
            $scope.sessionObject.paymentOption = data.payment_option;
            if (isLogin) {
              $scope.amountEntered = $scope.sessionObject.amount;
              $scope.selectedPaymentOption = $scope.sessionObject.paymentOption;
              $scope.paymentOption.forEach(function (option) {
                if (option.type === $scope.sessionObject.paymentOption) {
                  $scope.object = option.object;
                }
              });
              getImpact();
            }
            buildRazorPayOptions();
          } else {
            $scope.showLoginModal = true;
          }
        });
      }

      $scope.postSession = function () {
        $scope.projectsModel.postSession($scope.projectId, $scope.amountEntered, $scope.selectedPaymentOption).then(function () {
          getSession();
        });
      }

      if ($location.search().login) {
        getSession(true);
      } else {
        $rootScope.fullViewLoader.showLoader();
        $scope.projectsModel.getSession().then(function (data) {
          $rootScope.fullViewLoader.hideLoader();
          if (data.user && data.user_id) {
            $scope.showUserIcon = true;
          }
          if ($scope.showUserIcon && data.user.picture_link) {
            $scope.profilePicLink = data.user.picture_link;
          }
        });
      }

      $scope.hideLoginModal = function () {
        $scope.showLoginModal = false;
      }

      function buildRazorPayOptions () {
        var options = {
          "key": "rzp_test_WyK93y9mvps7SN",
          "amount": $scope.sessionObject.amount*100,
          "name": "Carbon offset",
          "description": "Mitigating "+$scope.impact.co2_reduced+" tons of CO2",
          "image": "https://www.earth47.com/src/images/illustrations/earth47-logo.svg",
          "handler": function (response){
            var payload = {
              razorpay_payment_id: response.razorpay_payment_id,
              amount: $scope.sessionObject.amount,
              user_id: $scope.sessionObject.user_id,
              project_id: $scope.sessionObject.project_id
            };
            if ($scope.payAnonymously) {
              payload.anonymous = true;
            }
            $rootScope.fullViewLoader.showLoader();
            $scope.projectsModel.postPaymentDetails(payload).then(function () {
              $scope.projectsModel.amountDonated = payload.amount;
              $rootScope.fullViewLoader.hideLoader();
              $location.url('thankyou');
            });
          },
          "prefill": {
              "name": $scope.sessionObject.user.nickname,
              "email": $scope.sessionObject.user.email
          },
          "notes": {
              "project_id": $scope.projectId
          },
          "theme": {
              "color": "#35cf00"
          }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
      }

      function logout () {
        $scope.projectsModel.logout().then(function () {
          window.location.reload();
          console.log("successfull logout ")
        });
      }

      $timeout(function () {
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
      });
    }
  ]);
})(angular);
