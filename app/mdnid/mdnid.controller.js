(function(){
	'use strict';
	angular.module('mdnid.module')
		.controller('mdnidCntl', mdnidCntl);

	mdnidCntl.$inject = ['mdnidService', '$state', 'loaderService','roService'];

	function mdnidCntl(mdnidService, $state, loaderService,roService){
		var vm = this;
		vm.phoneNumberRegex = '\\d{10}';
		vm.mdnidregex = '\\d{10}';
		vm.submitMdnidForm = submitMdnidForm;
		vm.errorText="";
		vm.loginFailed=false;
		activate();

		///////////////////////////

		function activate(){

		}

		function submitMdnidForm(isValid){
			if(isValid){
				//this will call the loading module
				//whenever need to make any api call call this loaderservice to show loading icon with full-overlay
				loaderService.toggle(true);
				//this API will call when user passed out of form validations
				//this API function(getAuthenticatedUser) is written inside the services
				//this will either return success(resolveAuthenticatedUser) or error message(errorAuthenticatedUser)
				mdnidService.getAuthenticatedUser(vm.customerId, vm.phoneNumber).then(resolveAuthenticatedUser, errorAuthenticatedUser);
			}
		}
		//this is the function called when success is return from api call
		function resolveAuthenticatedUser(data){
			if(data.status == true){
				roService.login(data.userId);
				$state.go('otp',{userId : data.userId,phone : data.phone,customerId : data.customerId });
				loaderService.toggle(false);
			}
			else if(data.status == false)
			{
			 loaderService.toggle(false);
			 vm.loginFailed = true;
             vm.errorText = data.error_text;
			}
		}
		//this is the function called when error is return from api call
		function errorAuthenticatedUser(error){
			loaderService.toggle(false);
			console.log(error);
		}

	}
})();
