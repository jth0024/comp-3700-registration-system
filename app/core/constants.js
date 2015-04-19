(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('ACCOUNT_PERMISSIONS', {
        	admin: 'admin',
        	instructor: 'instructor',
        	student: 'student'
        })
        .constant('AUTH_EVENTS', {
        	loginSuccess: 'auth-login-success',
        	loginFailed: 'auth-login-failed',
        	logoutSuccess: 'auth-logout-success',
        	sessionTimeout: 'auth-session-timeout',
        	notAuthenticated: 'auth-not-authenticated',
        	notAuthorized: 'auth-not-authorized'
        });


})();