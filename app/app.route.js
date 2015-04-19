(function() {
	'use strict';

	angular
		.module('app')
		.run(appRun)
		.config(configure);

	function appRun($rootScope, $state) {

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
			var requireLogin = toState.data.requireLogin;

			if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
				event.preventDefault();
				$state.go('login');
			}
		});

	}


	function configure($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/dashboard');

		$stateProvider
			.state('app', {
				abstract: true,
				data: {
					requireLogin: true
					authorizedRoles: [ACCOUNT_PERMISSIONS.admin, ACCOUNT_PERMISSIONS.instructor, ACCOUNT_PERMISSIONS.student]
				}
			});
	}

})();