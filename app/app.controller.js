(function() {
	'use strict';

	angular
		.module('app')
		.controller('App', App);


	function App($state, $scope, $rootScope, httpservice, PERMISSION_TYPES, AUTH_EVENTS, REQUEST_EVENTS, toastr, session, routerHelper) {
		var vm = this;
		vm.permissionTypes = PERMISSION_TYPES;
		vm.currentSession = session;

		///////////////////////Global $rootScope event listeners///////////////////////////////////

		//Authorization events
		$rootScope.$on(AUTH_EVENTS.loginRequest, function(event, args){
			httpservice.login(args).then(function (response) {
				if(!!!response.error) {
					vm.currentSession.authenticate(response);
					toastr.success('Successfully logged in ' + response.username + '.');
					routerHelper.go('app.dashboard');
				}
				else {
					toastr.error('Error: ' + response.error.msg);
				}

				}, function () {
					$rootScope.$broadcast(AUTH_EVENTS.unkownError);
			}); 
		});

		$rootScope.$on(AUTH_EVENTS.logoutRequest, function() {
			vm.currentSession.unAuthenticate();
			toastr.info('Goodbye!');
			$state.go('login');
		})

		$rootScope.$on(AUTH_EVENTS.notAuthorized, function(event) {
			toastr.info('Error: Not Authorized');
		});

		$rootScope.$on(AUTH_EVENTS.unknownError, function() {
			toastr.info('Oops! An error has occured.');
			$state.go('404');
		})

		//Request Events
		$rootScope.$on(REQUEST_EVENTS.dropCourseRequest, function(event, args) {
			//httpservice.dropCourse(args.courseID);
			toastr.info('Removed ' + args.id + ' from schedule!');
		});


	}


})();