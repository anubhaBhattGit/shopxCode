(function(){
	'use strict';
	angular.module('userbasicdetails.module')
		.controller('userbasicdetailsCntl', userbasicdetailsCntl);

	userbasicdetailsCntl.$inject = ['userbasicdetailsService','$state', 'roService','loaderService'];

	function userbasicdetailsCntl(userbasicdetailsService,$state, roService,loaderService){
		var vm = this;

		vm.returnPartial = returnPartial;
		vm.submitUserBasicDetailsForm = submitUserBasicDetailsForm;
		vm.emailregex = new RegExp('.+@.+\\..+');
		vm.panNumberRegex = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}$');
		vm.aadharRegex = new RegExp('[0-9]{4} [0-9]{4} [0-9]{4}');
		vm.voterIDRegex = new RegExp('[A-Z]{3}[0-9]{7}$');
		vm.driverLicenseRegex = new RegExp('^[0-9a-zA-Z]{4,9}$');
		vm.passportRegex = new RegExp('[A-PR-WYa-pr-wy][1-9][0-9]\\s?[0-9]{4}[1-9]$');
		vm.userBasicDetails = userbasicdetailsService.userBasicDetailsObject;
		vm.logout = logout;
		activate();

		///////////////////////////
               function activate(){
                 roService.checkUserIsLoggedIn($state.params.userId);
        		}


		function returnPartial(view){
			return './shared/partial/_' + view + '.html';
		}

		function submitUserBasicDetailsForm(isValid){
			if(isValid){
			loaderService.toggle(true);
				//this API will call when user passed out of form validations
				//this API function(saveUserBasicDetails) is written inside the services
				//this will either return success(resolveUserDetails) or error message(errorUserDetails)
				userbasicdetailsService.saveUserBasicDetails(vm.userBasicDetails,$state.params.userId).then(resolveUserDetails, errorUserDetails);
			}
		}
		 function logout(){
        			roService.logout();
        		}

		//this is the function called when success is return from api call
		function resolveUserDetails(data){
			if(data.status == true){
				$state.go('useraddressdetails',{userId: data.userId});
				//data is posted successfully
			loaderService.toggle(false);
			}
		}
		//this is the function called when error is return from api call
		function errorUserDetails(error){
			loaderService.toggle(false);
			console.log(error);
		}
	}
})();
