(function(){
	'use strict';
	angular.module('useraddressdetails.module')
		.controller('useraddressdetailsCntl', useraddressdetailsCntl);

	useraddressdetailsCntl.$inject = ['useraddressdetailsService', '$state','roService','loaderService'];

	function useraddressdetailsCntl(useraddressdetailsService, $state,roService,loaderService){
		var vm = this;

		vm.returnPartial = returnPartial;
		vm.submitUserAddressDetails = submitUserAddressDetails;
		vm.userAddressDetailsObject = useraddressdetailsService.userAddressDetailsObject;
		vm.logout = logout;
		activate();

		///////////////////////////

		function activate(){
                         roService.checkUserIsLoggedIn($state.params.userId);
                		}

		function returnPartial(view){
			return './shared/partial/_' + view + '.html';
		}

		function submitUserAddressDetails(isValid){
			if(isValid){
			loaderService.toggle(true);
				//this API will call when user passed out of form validations
				//this API function(saveUserBasicDetails) is written inside the services
				//this will either return success(resolveUserDetails) or error message(errorUserDetails)
				useraddressdetailsService.saveUserAddressDetails(vm.userAddressDetails,$state.params.userId).then(resolveUserDetails, errorUserDetails);
			}
		}
		//this is the function called when success is return from api call
		function resolveUserDetails(data){
			if(data.status == true){
				$state.go('userloandetails',{userId:$state.params.userId});
				loaderService.toggle(false);
				//data is posted successfully
			}
		}
		//this is the function called when error is return from api call
		function errorUserDetails(error){
			loaderService.toggle(false);
			console.log(error);
		}
		function logout(){
           roService.logout();
           		}

	}
})();
