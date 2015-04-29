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
            dropCourse: 'request-drop-course',
            addToCourse: 'request-add-to-course',
            createCourse: 'request-create-course',
            removeCourse: 'request-remove-course',
            createAccount: 'request-create-account',
            deleteAccount: 'request-delete-account'
        })
        .constant('COURSE_DEFAULTS', {
            times: [
            '8:00:00',
            '9:00:00',
            '10:00:00',
            '11:00:00',
            '12:00:00',
            '13:00:00',
            '14:00:00',
            '15:00:00',
            '16:00:00',
            '17:00:00',
            '18:00:00',
            '19:00:00'],
            capacities: [
            '5',
            '10',
            '25',
            '50',
            '75',
            '100',
            '150',
            '200'],
            days: [
            'TR',
            'MWF']
        })
        .constant('ACCOUNT_DEFAULTS', {
            holds: [
                'false',
                'true'
            ],
            registrationStatus: [
                'Freshman',
                'Sophomore',
                'Junior',
                'Senior'
            ],
            permissions: [
                'student',
                'instructor',
                'admin'
            ]
        })


})();