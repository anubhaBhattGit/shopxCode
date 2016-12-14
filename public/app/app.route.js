(function(){
	'use strict'
	angular.module('ro-app')
		.config(appConfig);

	appConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider'];

	function appConfig($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
		$stateProvider.
			state('mdnid', {
				url: '/',
				templateUrl: 'mdnid/mdnid.html',
    		controller: 'mdnidCntl',
    		controllerAs: 'ro'
			}).
			state('otp', {
				url: '/otp',
				 params: {
                    userId: null,
                    phone : null,
                    mdnid : null
                             },
				templateUrl: 'otp/otp.html',
    		controller: 'otpCntl',
    		controllerAs: 'ro'
			}).
			state('roorrmu', {
				url: '/roorrmu',
				 params: {
                       userId: null
                         },
				templateUrl: 'roorrmu/roorrmu.html',
    		controller: 'roorrmuCntl',
    		controllerAs: 'ro'
			}).
			state('userbasicdetails', {
				url: '/userbasicdetails',
				 params: {
                           userId: null
                          },
				templateUrl: 'userbasicdetails/userbasicdetails.html',
    		controller: 'userbasicdetailsCntl',
    		controllerAs: 'ro'
			}).
			state('useraddressdetails', {
				url: '/useraddressdetails',
					 params: {
                           userId: null
                                },
				templateUrl: 'useraddressdetails/useraddressdetails.html',
    		controller: 'useraddressdetailsCntl',
    		controllerAs: 'ro'
			}).
			state('userloandetails', {
				url: '/userloandetails',
				 params: {
                         userId: null
                        },
				templateUrl: 'userloandetails/userloandetails.html',
    		controller: 'userloandetailsCntl',
    		controllerAs: 'ro'
			}).
			state('userdownloadform', {
				url: '/userdownloadform',
				templateUrl: 'userdownloadform/userdownloadform.html',
    		controller: 'userdownloadformCntl',
    		controllerAs: 'ro'
			}).
			state('signedform', {
				url: '/signedform',
				templateUrl: 'uploadsignedform/uploadsignedform.html',
    		controller: 'signedFormCntl',
    		controllerAs: 'ro'
			}).
			state('thankyou', {
				url: '/thankyou',
				params: {
                     userId: null
                                  },
				templateUrl: 'thankyou/thankyou.html',
    		controller: 'thankyouCntl',
    		controllerAs: 'ro'
			}).
			state('loanrenewal', {
				url: '/loanrenewal',
				params: {
                         mdnid: null,
                         phone:null,
                         userId:null
                        },
				templateUrl: 'loanrenewalform/loanrenewalform.html',
    		controller: 'loanrenewalformCntl',
    		controllerAs: 'ro'
			}).
			state('statusmessage', {
				url: '/statusmessage',
				params: {
				          statusmessage: null,
				          userId:null
                     },
				templateUrl: 'statusmessage/statusmessage.html',
    		controller: 'statusmessageCntl',
    		controllerAs: 'ro'
			})

			$urlRouterProvider.otherwise('/');
	}
})();
