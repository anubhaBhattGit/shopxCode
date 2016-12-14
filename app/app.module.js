(function(){
	'use strict'

	angular.element(function() {
    angular.bootstrap(document, ['ro-app']);
  });

	angular.module('ro-app', [
		//Third party dependencies
		'ui.router',

		//common directives
		'core.module',
		'loader.module',

		//Application specific
		'mdnid.module',
		'otp.module',
		'roorrmu.module',
		'userbasicdetails.module',
		'useraddressdetails.module',
		'userloandetails.module',
		'userdownloadform.module',
		'signedForm.module',
		'thankyou.module',
		'loanrenewalform.module',
		'statusmessage.module'
	]);
})();
