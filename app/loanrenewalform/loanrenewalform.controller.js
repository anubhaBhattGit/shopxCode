(function(){
	'use strict';
	angular.module('loanrenewalform.module')
		.controller('loanrenewalformCntl', loanrenewalformCntl);

	loanrenewalformCntl.$inject = ['loanrenewalformService','$state','roService','loaderService'];

	function loanrenewalformCntl(loanrenewalformService,$state,roService,loaderService){
		var vm = this;
        vm.submitLoanRenewalForm = submitLoanRenewalForm;
		vm.returnPartial = returnPartial;
		vm.resolveAuthenticatedUser = resolveAuthenticatedUser;
		vm.errorAuthenticatedUser = errorAuthenticatedUser;
		vm.logout = logout;
		vm.gotorormu = gotorormu;
		vm.loanAmount;
		vm.tncChecked=false;
		vm.errorText ="";
		activate();

		///////////////////////////
        function submitLoanRenewalForm(isValid)
        {   vm.errorText ="";
            vm.tncChecked = false;
            if(isValid && userloandetails.scannedCopy.checked){
            				loaderService.toggle(true);

				//this API will call when user passed out of form validations
				//this API function(getAuthenticatedUser) is written inside the services
				//this will either return success(resolveAuthenticatedUser) or error message(errorAuthenticatedUser)
				loanrenewalformService.saveRenewalData(vm.userLoanDetails,$state.params.mdnid,$state.params.phone,$state.params.userId).then(resolveAuthenticatedUser, errorAuthenticatedUser);
			}
			else if(!userloandetails.scannedCopy.checked)
			{
             vm.errorText ="Check the terms and conditions box before proceeding";
             vm.tncChecked = true;
			}
        }
        function logout(){
                    roService.logout();
                   		}
                  function gotorormu(){
                  $state.go('roorrmu',{userId: $state.params.userId});
                                    }

        	function resolveAuthenticatedUser(data){
        	   var element = angular.element('#loanCheckModal');
        			if(data.loanValid == true){
                     $state.go('thankyou',{userId :$state.params.userId});
                     				loaderService.toggle(false);

        			}
        			else if(data.loanValid == false){
        			  loaderService.toggle(false);
        			  vm.loanAmount = data.amount;
                      element.modal('show');

        			}
        		}
        		//this is the function called when error is return from api call
        		function errorAuthenticatedUser(error){
        			loaderService.toggle(false);
        			console.log(error);
        		}
		function activate(){
                         roService.checkUserIsLoggedIn($state.params.userId);
                		}

		function returnPartial(view){
			return './shared/partial/_' + view + '.html';
		}
	}
})();
