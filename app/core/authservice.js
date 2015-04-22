(function() {
	'use strict';

	angular
		.module('app.core')
		.factory('authservice', authservice);

	function authservice($http, session) {

		var service = {
			login: login,
			isAuthenticated: isAuthenticated,
			isAuthorized: isAuthorized,
			logout: logout
		};

		return service;


		function login(credentials) {
			//Uncomment once sam finishes login url
			/*return $http.post('/loginURL', credentials)
				.then(function(response) {
					session.create(response.data.id, response.data.account.id, response.data.account.permission);
					return response.data.account;
				});*/
			if (credentials.username == 'jth0024' && credentials.password == 'password') {
				session.create('343', 'jordan', 'student');
				return({
					name: 'Jordan',
					username: 'jth0024',
					permission: 'student'
				});
			}
		}

		function logout() {
			session.destroy();
		}

		function isAuthenticated() {
			return !!session.accountId;
		}

		function isAuthorized(authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (isAuthenticated() && authorizedRoles.indexOf(session.permission) !== -1);
		}

	}
})();