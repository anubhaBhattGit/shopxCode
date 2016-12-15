(function(ro){
	'use strict';
	angular.module('mdnid.module')
	.service('mdnidService', mdnidService);

	mdnidService.$inject = ['$http', '$q'];

	function mdnidService($http, $q){
		var service;

		service = {
      getAuthenticatedUser: getAuthenticatedUser
    };

		return service;

		function getAuthenticatedUser(customerId, phone) {
        var deferred = $q.defer();

				//in url please enter url of the api
				//mehtod could be get,post, delete and others standard http requet method
				//params will consist of the list of parameter(comma separated) that need to be passed in API call
        $http({
            url : 'https://dev.epaylater.in/epayLaterView/saveCustomerIdData',
            method: "POST",
            params: {
							customerId: customerId,
							phone: phone
						}
        })
        .success(function (data) {
            deferred.resolve(data);
        })
        .error(function (data) {
            deferred.reject("Failed to get data");
        });
				
        return deferred.promise;
    }
	}

})(window);
