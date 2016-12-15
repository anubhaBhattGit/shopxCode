(function(ro){
	'use strict';
	angular.module('roorrmu.module')
	.service('roorrmuService', roorrmuService);

	roorrmuService.$inject = ['$http', '$q'];

	function roorrmuService($http, $q){
		var service;

		service = {
      postUserType: postUserType
    };

		return service;

		function postUserType(userType,id) {
        var deferred = $q.defer();

				//in url please enter url of the api
				//mehtod could be get,post, delete and others standard http requet method
				//params will consist of the list of parameter(comma separated) that need to be passed in API call
        $http({
            url : 'https://dev.epaylater.in/epayLaterView/saveShopxRoRmu',
            method: "POST",
            params: {
							userType: userType,
							userId : id
						}
        })
        .success(function (data) {
            deferred.resolve(data);
        })
        .error(function () {
            deferred.reject("Failed to post data");
        });

        return deferred.promise;
    }
	}

})(window);
