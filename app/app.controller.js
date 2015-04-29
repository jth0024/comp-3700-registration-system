(function() {
	'use strict';

	angular
		.module('app')
		.controller('App', App);


	function App($state, $scope, $rootScope, $modal, httpservice, PERMISSION_TYPES, AUTH_EVENTS, REQUEST_EVENTS, toastr, session, routerHelper) {
		var vm = this;
		vm.permissionTypes = PERMISSION_TYPES;
		vm.currentSession = session;

		///////////////////////Global $rootScope event listeners///////////////////////////////////

		/////LOGIN/////
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

		/////LOGOUT/////
		$rootScope.$on(AUTH_EVENTS.logoutRequest, function() {
			vm.currentSession.unAuthenticate();
			toastr.info('Goodbye!');
			$state.go('login');
		});

		/////NOT AUTHORIZED//////
		$rootScope.$on(AUTH_EVENTS.notAuthorized, function(event) {
			toastr.info('Error: Not Authorized');
		});

		/////UNKNOWN ERROR///////
		$rootScope.$on(AUTH_EVENTS.unknownError, function() {
			toastr.info('Oops! An error has occured.');
			$state.go('404');
		})

		////////DROP COURSE////////
		$rootScope.$on(REQUEST_EVENTS.dropCourse, function(event, args) {
			httpservice.removeStudentFromCourse(args.username, args.courseID).then(function (response) {
				if (!!!response.error) {
					toastr.info(args.name + ' has been removed from your schedule!');
				}
				else {
					toastr.error('Error: ' + response.error.msg);
				}
			}, function() {
				$rootScope.$broadcast(AUTH_EVENTS.unkownError);
			});
		});

		////////ADD TO COURSE////////
		$rootScope.$on(REQUEST_EVENTS.addToCourse, function(event, args) {
			httpservice.addStudentToCourse(args.username, args.courseID).then(function (response) {
				if (!!!response.error) {
					toastr.info(args.name + ' has been added to your schedule!');
				}
				else {
					toastr.error('Error: ' + response.error.msg);
				}
			}, function() {
				$rootScope.$broadcast(AUTH_EVENTS.unkownError);
			});
		});

		////////CREATE COURSE////////
		$rootScope.$on(REQUEST_EVENTS.createCourse, function() {
			var createCourseInstance = $modal.open({
				templateUrl: 'app/form/form.createcourse.html',
				controller: 'CreateCourse',
				controllerAs: 'vm',
                resolve: {
                    accounts:  function(httpservice){
                        // $http returns a promise for the url data
                        return httpservice.getAccountsCatalog();
                    }
                }
			});

            createCourseInstance.result.then(function (course) {
				httpservice.createCourse(course).then(function (response) {
					if (!!!response.error) {
						toastr.info('Created new course: ' + course.name);
					}
					else {
						toastr.error('Error: ' + response.error.msg);
					}
				}, function() {
					$rootScope.$broadcast(AUTH_EVENTS.unkownError);
				});
            }, function () {
              console.log('Modal dismissed at: ' + new Date());
            });
		});

		////////REMOVE COURSE////////
		$rootScope.$on(REQUEST_EVENTS.removeCourse, function(event, args) {
			httpservice.removeCourse(args.courseID).then(function (response) {
				if (!!!response.error) {
					toastr.info(args.name + ' has been deleted.');
				}
				else {
					toastr.error('Error: ' + response.error.msg);
				}
			}, function() {
				$rootScope.$broadcast(AUTH_EVENTS.unkownError);
			});
		});

		////////CREATE ACCOUNT////////
		$rootScope.$on(REQUEST_EVENTS.createAccount, function() {
			var createAccountInstance = $modal.open({
				templateUrl: 'app/form/form.createaccount.html',
				controller: 'CreateAccount',
				controllerAs: 'vm',
                resolve: {
                    accounts:  function(httpservice){
                        // $http returns a promise for the url data
                        return httpservice.getAccountsCatalog();
                    }
                }
			});

            createAccountInstance.result.then(function (account) {
            	console.log(account);
				httpservice.createAccount(account).then(function (response) {
					if (!!!response.error) {
						toastr.info('Created new account: ' + account.name);
					}
					else {
						toastr.error('Error: ' + response.error.msg);
					}
				}, function() {
					$rootScope.$broadcast(AUTH_EVENTS.unkownError);
				});
            }, function () {
              console.log('Modal dismissed at: ' + new Date());
            });
		});

		////////DELETE ACCOUNT////////
		$rootScope.$on(REQUEST_EVENTS.deleteAccount, function(event, args) {
			httpservice.deleteAccount(args.username).then(function (response) {
				if (!!!response.error) {
					toastr.info(args.username + ' has been deleted.');
				}
				else {
					toastr.error('Error: ' + response.error.msg);
				}
			}, function() {
				$rootScope.$broadcast(AUTH_EVENTS.unkownError);
			});
		});


	}


})();