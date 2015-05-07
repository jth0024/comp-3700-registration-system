(function() {
	'use strict';

	angular
		.module('app.core')
		.config(toastrConfig);

	function toastrConfig(toastr) {
		toastr.options.timeOut = 1500;
		toastr.options.positionClass = 'toast-top-center';
		toastr.options.closeButton = true;
	}
})();