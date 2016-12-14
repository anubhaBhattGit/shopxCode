(function(){
	'use strict';
	angular.module('thankyou.module')
		.controller('thankyouCntl', thankyouCntl);

	thankyouCntl.$inject = ['thankyouService','roService','$state','loaderService'];

	function thankyouCntl(thankyouService,roService,$state,loaderService){
		var vm = this;

		vm.returnPartial = returnPartial;
		vm.logout = logout;

		activate();

		///////////////////////////

		function activate(){
						loaderService.toggle(true);
                         roService.checkUserIsLoggedIn($state.params.userId);
                						loaderService.toggle(false);
                		}
          function logout(){
                roService.logout();
              		}
		function returnPartial(view){
			return './shared/partial/_' + view + '.html';
		}

	}
})();
