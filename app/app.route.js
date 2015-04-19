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

			/*if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
				event.preventDefault();
				$state.go('login');
			}*/
			if(requireLogin) {
				if(!authservice.isAuthorized(authorizedRoles)) {
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
			}

		});

		$rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
			$state.go('dashboard');
		});

	}


	function configure($stateProvider, $urlRouterProvider, ACCOUNT_PERMISSIONS) {

		$urlRouterProvider.otherwise('/dashboard');

		/*$stateProvider
			.state('app', {
				abstract: true,
				data: {
					requireLogin: true,
					authorizedRoles: [ACCOUNT_PERMISSIONS.admin, ACCOUNT_PERMISSIONS.instructor, ACCOUNT_PERMISSIONS.student]
				}
			});*/
	}

})();