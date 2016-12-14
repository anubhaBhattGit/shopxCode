(function(){
	'use strict'

	angular.module('ro-app')
		.service('roService', roService);

	roService.$inject = ['$window','$state'];

	function roService($window,$state){
		var service = this;

		service = {
			logout: logout,
			login : login,
			checkUserIsLoggedIn : checkUserIsLoggedIn
		}
		//this is how you need to add
		//$window.sessionStorage.setItem("userId", "12");
		return service;


		function logout(){
			$window.sessionStorage.clear();
			$state.go('mdnid');
		}

		function login(userId){
			$window.sessionStorage.setItem("userId", userId);
		}

		function checkUserIsLoggedIn(userId)
		{
		if(userId==null)
        		   {
                   logout();
        		   }

		}
	}
})();
