(function() {
	'use strict';

	angular
		.module('app')
		.controller('App', App);


	function App($state, $scope, $rootScope, authservice, ACCOUNT_PERMISSIONS, AUTH_EVENTS, toastr) {

		$scope.currentUser = null;
		$scope.accountPermissions = ACCOUNT_PERMISSIONS;
		$scope.isAuthorized = authservice.isAuthorized;	
		$scope.setCurrentUser = setCurrentUser;


		function setCurrentUser(user) {
			$scope.currentUser = user;
		}

		$rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
			toastr.success('Successfully logged in ' + $scope.currentUser.username + '.');
			$state.go('app.dashboard');
		});

		$rootScope.$on(AUTH_EVENTS.loginFailed, function(){
			toastr.error('Invalid username/password');
		});
	}


})();