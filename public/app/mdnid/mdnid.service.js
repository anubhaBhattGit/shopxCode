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

		function getAuthenticatedUser(mdnid, phone) {
        var deferred = $q.defer();

				//in url please enter url of the api
				//mehtod could be get,post, delete and others standard http requet method
				//params will consist of the list of parameter(comma separated) that need to be passed in API call
        $http({
            url : 'http://localhost:9090/epayLaterView/saveMdnidData',
            method: "POST",
            params: {
							mdnid: mdnid,
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
