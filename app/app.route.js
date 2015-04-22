(function() {
	'use strict';

	angular
		.module('app')
		.config(configure);


	function configure($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/dashboard');

		//all children of app state inherit requireLoging = true
		$stateProvider
			.state('app', {
				abstract: true,
				template: '<ui-view/>',
				data: {
					requireLogin: true,
				}
			});
	}

})();