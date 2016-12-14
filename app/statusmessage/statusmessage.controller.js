(function(){
	'use strict';
	angular.module('statusmessage.module')
		.controller('statusmessageCntl', statusmessageCntl);

	statusmessageCntl.$inject = ['statusmessageService', '$rootScope', '$state','roService'];

	function statusmessageCntl(statusmessageService, $rootScope, $state,roService){
		var vm = this;

		vm.returnPartial = returnPartial;
		vm.logout = logout;
		vm.statusmessage = $state.params.statusmessage;
		activate();

		///////////////////////////

		function activate(){
                         roService.checkUserIsLoggedIn($state.params.userId);
                		}

		function returnPartial(view){
			return './shared/partial/_' + view + '.html';
		}

		function logout(){
			// var data = {
			// 	'message' : 'Successfully logout.',
			// 	'error' : false
			// };
			// notificationService.setNotification(data);
			// //Show notification
			// $rootScope.$broadcast('showNotification');
			$state.go('mdnid');

		}

		function submitOtpForm(isValid){
				statusmessageService.getStatus().then(resolveStatus, errorStatus);
		}
		//this is the function called when success is return from api call
		function resolveStatus(data){
			if(data == true){
			}else{
			}
		}
		//this is the function called when error is return from api call
		function errorStatus(error){
			console.log(error);
		}

	}
})();
