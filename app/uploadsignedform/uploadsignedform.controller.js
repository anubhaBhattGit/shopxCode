(function(){
	'use strict';
	angular.module('signedForm.module')
		.controller('signedFormCntl', signedFormCntl);

	signedFormCntl.$inject = ['signedFormService','roService'];

	function signedFormCntl(signedFormService,roService){
		var vm = this;
		vm.roService = roService;

		vm.returnPartial = returnPartial;
		activate();

		///////////////////////////

		function activate(){

		}

		function returnPartial(view){
			return './shared/partial/_' + view + '.html';
		}
			function logout(){
                   roService.logout();
                   		}
	}
})();
