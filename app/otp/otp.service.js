(function(ro){
	'use strict';
	angular.module('otp.module')
	.service('otpService', otpService);

	otpService.$inject = ['$http', '$q'];

	function otpService($http, $q){
		var service;

		service = {
      getAuthenticatedUser: getAuthenticatedUser
    };

		return service;

		function getAuthenticatedUser(otp,phone,customerId) {
        var deferred = $q.defer();

				//in url please enter url of the api
				//mehtod could be get,post, delete and others standard http requet method
				//params will consist of the list of parameter(comma separated) that need to be passed in API call
        $http({
            url : 'http://localhost:9090/epayLaterView/shopxOtpApiCall',
            method: "POST",
            params: {
							otp: otp,
							phone : phone,
							customerId : customerId
						}
        })
        .success(function (data) {
            deferred.resolve(data);
        })
        .error(function () {
            deferred.reject("Failed to get data");
        });

        return deferred.promise;
    }
	}

})(window);
