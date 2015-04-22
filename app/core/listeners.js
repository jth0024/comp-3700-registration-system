(function() {
	'use strict';

	angular
		.module('app.core')
		.run(appRun)

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

		$rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
			toastr.success('Successfully logged in ' + $scope.global.currentAccount.username + '.');
			$state.go('app.dashboard');
		});

		$rootScope.$on(AUTH_EVENTS.loginFailed, function(){
			toastr.error('Invalid username/password');
		});

		$rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
			toastr.info('Goodbye!');
			$state.go('login');
		});

	}

})();