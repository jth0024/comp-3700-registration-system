(function() {
	'use strict';

	angular
		.module('app')
		.run(appRun)
		.config(configure);

	function appRun($rootScope, $state, AUTH_EVENTS, authservice) {

		$rootScope.$on('$stateChangeStart', function (event, next, nextParams) {
			var requireLogin = next.data.requireLogin;
			var authorizedRoles = next.data.authorizedRoles;

			if(requireLogin && !authservice.isAuthorized(authorizedRoles)) {
				event.preventDefault();
				if (authservice.isAuthenticated()) {
					//User doesn't have permission
					$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
				}
				else {
					//User isn't logging in
					$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
					$state.go('login');
				}
			}

		});

		$rootScope.$on('$stateNotFound', function(event) {
			event.preventDefault();
			$state.go('404');
		});

	}


	function configure($stateProvider, $urlRouterProvider, ACCOUNT_PERMISSIONS) {

		$urlRouterProvider.otherwise('/dashboard');

		$stateProvider
			.state('app', {
				abstract: true,
				template: '<ui-view/>',
				data: {
					requireLogin: true,
					//authorizedRoles: [ACCOUNT_PERMISSIONS.admin, ACCOUNT_PERMISSIONS.instructor, ACCOUNT_PERMISSIONS.student]
				}
			});
	}

})();