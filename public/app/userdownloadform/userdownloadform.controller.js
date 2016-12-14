(function(){
	'use strict';
	angular.module('userdownloadform.module')
		.controller('userdownloadformCntl', userdownloadformCntl);

	userdownloadformCntl.$inject = ['userdownloadformService','roService','$state'];

	function userdownloadformCntl(userdownloadformService,roService,$state){
		var vm = this;

		vm.returnPartial = returnPartial;
		vm.logout = logout;
		activate();

		///////////////////////////

		function activate(){
                         roService.checkUserIsLoggedIn($state.params.userId);
                		}
			function logout(){
                   roService.logout();
                   		}

		function returnPartial(view){
			return './shared/partial/_' + view + '.html';
		}

	}
})();
