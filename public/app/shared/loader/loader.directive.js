(function(){
	'use strict';
	angular.module('loader.module')
		.directive('roLoader', roLoader);

	roLoader.$inject = ['loaderService'];

	function roLoader(loaderService) {
	    var directive =  {
	        restrict : 'E',
	        templateUrl : './shared/loader/loader.html',
	        scope : false,
	        replace: true,
	        link : function(scope, element, attrs){
	        	var _this = scope;

	        	_this.$watch(
        			function(){
        				return loaderService.isLoader;
        			},

	        		function(){
		        		var flag = loaderService.isLoader;
		        		if(flag){
		        			element.show();
		        		}else{
			        		element.hide();
			        	}
	        		}
	        	);
	        }
	    };
	    return directive;
	}
})();
