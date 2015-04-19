(function() {
	'use strict';

	angular
		.module('app')
		.controller('App', App);


	function App($scope, authservice, ACCOUNT_PERMISSIONS) {

		$scope.currentUser = null;
		$scope.accountPermissions = ACCOUNT_PERMISSIONS;
		$scope.isAuthorized = authservice.isAuthorized;	
		$scope.setCurrentUser = setCurrentUser;


		function setCurrentUser(user) {
			$scope.currentUser = user;
			console.log("Set current user to " + user.name);
		}

		/*function getCurrentUser() {

		}*/
	}


})();