(function(){
	'use strict';
	angular.module('otp.module')
		.controller('otpCntl', otpCntl);

	otpCntl.$inject = ['otpService','$state','roService','$scope','loaderService'];

	function otpCntl(otpService,$state,roService,$scope,loaderService){
		var vm = this;
		vm.submitOtpForm = submitOtpForm;
		vm.errorMessage ="";

		activate();

		///////////////////////////

		function activate(){
         roService.checkUserIsLoggedIn($state.params.userId);
		}

		function submitOtpForm(isValid){
			if(isValid){
				loaderService.toggle(true);
				//this API will call when user passed out of form validations
				//this API function(getAuthenticatedUser) is written inside the services
				//this will either return success(resolveAuthenticatedUser) or error message(errorAuthenticatedUser)
				otpService.getAuthenticatedUser(vm.otp,$state.params.phone,$state.params.customerId).then(resolveAuthenticatedUser, errorAuthenticatedUser);
			}
		}
		//this is the function called when success is return from api call
		function resolveAuthenticatedUser(data){
			if(data.status == true){
			if(data.applicationStatus == "none")
				$state.go('roorrmu',{userId: $state.params.userId});
				else if(data.applicationStatus == "applicableForRenewal")
				$state.go('loanrenewal',{customerId: $state.params.customerId , phone: $state.params.phone,userId: $state.params.userId});
				else
				$state.go('statusmessage',{statusmessage: data.applicationStatus,userId:$state.params.userId});
				//workflow on new user or existing user need to be added here
				//api need to return is the user is new or old
			loaderService.toggle(false);
			}else{
				//wrong otp
				//otp authentication failed
				vm.errorMessage = data.errorText;
				loaderService.toggle(false);

			}
		}
		//this is the function called when error is return from api call
		function errorAuthenticatedUser(error){
		 loaderService.toggle(false);
		 console.log(error);
		}
	}
})();
