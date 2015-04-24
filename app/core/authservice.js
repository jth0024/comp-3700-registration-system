(function() {
	'use strict';

	angular
		.module('app.core')
		.factory('httpservice', httpservice);

	function httpservice($http, session) {

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
			if (credentials.username == 'student' && credentials.password == 'password') {
				session.create('343', 'student', 'student');
				return({
					name: 'Jordan',
					username: 'student',
					permission: 'student'
				});
			}
			if (credentials.username == 'admin' && credentials.password == 'password') {
				session.create('343', 'admin', 'admin');
				return({
					name: 'Greg',
					username: 'admin',
					permission: 'admin'
				});
			}
			if (credentials.username == 'instructor' && credentials.password == 'password') {
				session.create('343', 'instructor', 'instructor');
				return({
					name: 'Sara',
					username: 'instructor',
					permission: 'instructor'
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