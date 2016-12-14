(function(){
	'use strict';
	angular.module('userloandetails.module')
		.controller('userloandetailsCntl', userloandetailsCntl);

	userloandetailsCntl.$inject = ['userloandetailsService', '$scope', '$timeout','roService','$state','$http','loaderService'];

	function userloandetailsCntl(userloandetailsService, $scope, $timeout,roService,$state,$http,loaderService){
		var vm = this;
		vm.userloandetails = [];
		vm.returnPartial = returnPartial;
		vm.submitUserLoanDetailsForm = submitUserLoanDetailsForm;
		vm.addMoreItems = addMoreItems;
		vm.userloandetails.idProofs = userloandetailsService.idProofs;
		vm.userloandetails.addressProofs = userloandetailsService.addressProofs;
		vm.uploadCopy = uploadCopy;
		vm.logout = logout;
		vm.tncChecked=false;
        vm.errorText ="";
		activate();

		///////////////////////////

		function activate(){
                         roService.checkUserIsLoggedIn($state.params.userId);
                		}

		function returnPartial(view){
			return './shared/partial/_' + view + '.html';
		}

		function submitUserLoanDetailsForm(isValid){
			if(isValid && userloandetails.scannedCopy.checked){
				loaderService.toggle(true);
				//this API will call when user passed out of form validations
				//this API function(saveUserBasicDetails) is written inside the services
				//this will either return success(resolveUserDetails) or error message(errorUserDetails)
				userloandetailsService.saveUserLoanDetails(vm.userLoanDetails, vm.userloandetails,$state.params.userId).then(resolveUserDetails, errorUserDetails);
			}
			else if(!userloandetails.scannedCopy.checked)
            			{
                         vm.errorText ="Check the terms and conditions box before proceeding";
                         vm.tncChecked = true;
            			}
		}
		//this is the function called when success is return from api call
		function resolveUserDetails(data){
			if(data.status == true){
				$state.go('thankyou',{userId: $state.params.userId});
				//data is posted successfully
					loaderService.toggle(false);
			}
		}
			function logout(){
                   roService.logout();
                   		}
		//this is the function called when error is return from api call
		function errorUserDetails(error){
			loaderService.toggle(false);
			console.log(error);
		}

		function addMoreItems(obj, textString){
			userloandetailsService.addMoreItems(obj, textString);
		}

		function uploadCopy(id){
			document.getElementById(id).click();
		}
		$scope.fileNameChangedIdProof = function(e){

			if (!vm.userloandetails.idProofs.value)
					vm.userloandetails.idProofs.value = [];

			if (!vm.userloandetails.idProofs.fakeValue)
					vm.userloandetails.idProofs.fakeValue = [];
					$timeout(function() {
						$scope.$apply(function () {
		            if (e && e.files) {
		                for (var i = 0; i < e.files.length; i++) {
		                    if (vm.userloandetails.idProofs.fakeValue.indexOf(e.files[i].name) !== -1) continue;

		                    vm.userloandetails.idProofs.fakeValue.push((e.files[i].name).replace('C:\\fakepath\\', ''));
		                    vm.userloandetails.idProofs.value.push(e.files[i]);
		                }
		            }
		        });
					}, 0);
				console.log(vm.userloandetails.idProofs);
		}

		$scope.fileNameChangedAddressProof = function(event){
			var value = event.target.value;
	    if(typeof value !== "undefined"){
	      var fakeValue = value.replace('C:\\fakepath\\', '');
	      $scope.$apply(function() {
						vm.userloandetails.addressProofs[vm.userloandetails.addressProofs.length-1].fakeValue = fakeValue;
						vm.userloandetails.addressProofs[vm.userloandetails.addressProofs.length-1].value = value;
	      });
	    }
		}

	}
})();