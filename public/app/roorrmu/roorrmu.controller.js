(function(){
	'use strict';
	angular.module('roorrmu.module')
		.controller('roorrmuCntl', roorrmuCntl);

	roorrmuCntl.$inject = ['roorrmuService', '$state','roService','loaderService'];

	function roorrmuCntl(roorrmuService, $state,roService,loaderService){
		var vm = this;
		vm.submitRoOrRmuForm = submitRoOrRmuForm;
		vm.logout = logout;

		activate();

		///////////////////////////

		function activate(){
                 roService.checkUserIsLoggedIn($state.params.userId);
        		}

		function submitRoOrRmuForm(isValid){
			if(isValid){
				//this API will call when user passed out of form validations
				//this API function(getUserType) is written inside the services
				//this will either return success(resolveUserType) or error message(errorUserType)
				loaderService.toggle(true);
				roorrmuService.postUserType(vm.userType,$state.params.userId).then(resolveUserType, errorUserType);
			}
		}
		//this is the function called when success is return from api call
		function resolveUserType(data){
			if(data.status == true){
                 $state.go('userbasicdetails',{userId : data.userId});
                 loaderService.toggle(false);
                 			}
		}
		//this is the function called when error is return from api call
		function errorUserType(error){
		 loaderService.toggle(false);
			console.log(error);
		}
			function logout(){
        			roService.logout();
        		}
	}
})();
