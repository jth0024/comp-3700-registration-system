(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('PERMISSION_TYPES', {
        	all: '*',
        	admin: 'admin',
        	instructor: 'instructor',
        	student: 'student'
        })
        .constant('AUTH_EVENTS', {
        	loginRequest: 'auth-login-request',
            logoutRequest: 'auth-logout-request',
        	sessionTimeout: 'auth-session-timeout',
        	notAuthenticated: 'auth-not-authenticated',
        	notAuthorized: 'auth-not-authorized',
            unknownError: 'auth-error-404'
        })
        .constant('REQUEST_EVENTS', {
            dropCourseRequest: 'request-drop-course'
        });


})();