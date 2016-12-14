(function(ro){
	'use strict';
	angular.module('statusmessage.module')
	.service('statusmessageService', statusmessageService);

	statusmessageService.$inject = [];

	function statusmessageService(){
		var service;

		service = {
      getStatus: getStatus
    };

		return service;

		function getStatus(otp) {
        var deferred = $q.defer();

			  $http({
            url : 'url',
            method: "GET",
            params: {
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
