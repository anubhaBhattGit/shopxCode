(function(){
	'use script';
	angular.module('loader.module')
		.service('loaderService', loaderService);

	function loaderService(){
		this.isLoader = false;
		this.toggle = toggle;
		this.loaderState = loaderState; 

		//To toggle loader
		function toggle(state){
			this.isLoader = state;
		}

		//Returns state of the loader
		function loaderState(){
			return this.isLoader;
		}
	}
})();