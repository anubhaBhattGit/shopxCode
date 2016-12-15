(function(ro){
	'use strict';
	angular.module('useraddressdetails.module')
	.service('useraddressdetailsService', useraddressdetailsService);

	useraddressdetailsService.$inject = ['$http', '$q'];

	function useraddressdetailsService($http, $q){
		var service,
			userAddressDetailsObject = [{
				"companyname": "",
				"address": "",
				"city": "",
				"pincode": "",
				"businesspan": "",
				"noPanCard": false,
				"shopEstablishment": "",
				"doIDay": "0",
				"doIMonth": "0",
				"doIYear": "0"
			}]

		service = {
      saveUserAddressDetails: saveUserAddressDetails,
			userAddressDetailsObject: userAddressDetailsObject
    };

		return service;

		function saveUserAddressDetails(user,id) {
        var deferred = $q.defer();

				//in url please enter url of the api
				//mehtod could be get,post, delete and others standard http requet method
				//params will consist of the list of parameter(comma separated) that need to be passed in API call
         $http({
                   url : 'http://localhost:9090/epayLaterView/saveAddressDetails',
                   method: "POST",
                   params: {
       							user: user,
       							userId:id
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
