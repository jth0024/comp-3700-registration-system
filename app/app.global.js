(function() {
	'use strict';

	angular
		.module('app')
		.controller('App', App);


	function App($state, $scope, $rootScope, httpservice, PERMISSION_TYPES, AUTH_EVENTS, toastr, session) {
		var vm = this;

		vm.currentAccount = null;
		vm.permissionTypes = PERMISSION_TYPES;
		vm.isAuthorized = httpservice.isAuthorized;	
		vm.setCurrentAccount = setCurrentAccount;


		function setCurrentAccount(account) {
			vm.currentAccount = account;
		}


		///////////////////////Global $rootScope event listeners///////////////////////////////////

		$rootScope.$on('$stateChangeStart', function (event, next, nextParams) {
			var requireLogin = next.data.requireLogin;
			var authorizedRoles = next.data.authorizedRoles;

			if(requireLogin && !httpservice.isAuthorized(authorizedRoles)) {
				event.preventDefault();
				if (httpservice.isAuthenticated()) {
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

		$rootScope.$on(AUTH_EVENTS.loginSuccess, function(event, args){
			session.create(args.name, args.username, args.permission);
			vm.setCurrentAccount(args);
			toastr.success('Successfully logged in ' + vm.currentAccount.username + '.');
			$state.go('app.dashboard');
		});

		$rootScope.$on(AUTH_EVENTS.loginFailed, function(event, args){
			toastr.error('Error: ' + args.error.msg);
		});

		$rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
			toastr.info('Goodbye!');
			$state.go('login');
		});
	}


})();