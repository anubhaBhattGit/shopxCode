(function(ro){
	'use strict';
	angular.module('loanrenewalform.module')
	.service('loanrenewalformService', loanrenewalformService);

	loanrenewalformService.$inject = ['$http', '$q'];

		function loanrenewalformService($http, $q){
    		var service;

    		service = {
          saveRenewalData: saveRenewalData
        };

    		return service;

    		function saveRenewalData(userLoanDetails,customerId,phone,id) {
            var deferred = $q.defer();

    				//in url please enter url of the api
    				//mehtod could be get,post, delete and others standard http requet method
    				//params will consist of the list of parameter(comma separated) that need to be passed in API call
            $http({
                url : 'https://dev.epaylater.in/epayLaterView/updateShopxLoanRenewalAmount',
                method: "POST",
                params: {
                userLoanDetails:userLoanDetails,
                customerId:customerId,
                phone:phone,
                userId:id
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
