(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('httpservice', httpservice);

    function httpservice($http, session, REQUEST_EVENTS, PERMISSION_TYPES) {

        var service = {
            getCoursesCatalog: getCoursesCatalog,
            createCourse: createCourse,
            removeCourse: removeCourse,
            updateCourse: updateCourse,
            getCourse: getCourse,
            getAccountsCatalog: getAccountsCatalog,
            createAccount: createAccount,
            updateAccount: updateAccount,
            deleteAccount: deleteAccount,
            getAccount: getAccount,
            getSchedule: getSchedule,
            addStudentToCourse: addStudentToCourse,
            removeStudentFromCourse: removeStudentFromCourse,
            login: login
        };

        return service;
        
        function serverRequest(message) {
            var requestUrl = 'http://sasbartlett.com/comp3700/server/index.php';
            message = JSON.stringify(message);
            console.log("MESSAGE:");
            console.log(message);
            return $http({
                    method: 'POST',
                    url: requestUrl,
                    data: "message=" + message,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(function(response) {
                    console.log(response);
                    return response.data;
                });    
        }

        function addStudentToCourse(id, course) {
            var message = {
                username: id,
                courseID: course,
                request_type: 'add_student_to_course',
            };
            return serverRequest(message);
        }

        function removeStudentFromCourse(id, course) {
            var message = {
                username: id,
                courseID: course,
                request_type: 'remove_student_from_course',
            };
            return serverRequest(message);
        }

        function getCoursesCatalog() {
            var message = {
                request_type: 'get_all_courses',
            };
            return serverRequest(message);
        };

        function getCourse(ID) {
            var message = {
                request_type: 'get_course',
                courseID: ID
            };
            return serverRequest(message);
        }     

        function createCourse(course) {
            var message = {
                request_type: 'create_course',
                name: course.name,
                instructor: course.instructor,
                capacity: course.capacity,
                day: course.day,
                startTime: course.startTime,
                roster: []
            };
            return serverRequest(message);
        };

        function updateCourse(course) {
            var message = {
                request_type: 'update_course',
                courseID: course.id,
                name: course.name,
                instructor: course.instructor,
                capacity: course.capacity,
                day: course.day,
                startTime: course.startTime,
                roster: course.roster
            };
            console.log(message);
            return serverRequest(message);
        };

        function removeCourse(ID) {
            var message = {
                courseID: ID,
                request_type: 'remove_course',
            };
            return serverRequest(message);
        }

        function getAccountsCatalog() {
            var message = {
                request_type: 'get_all_accounts'
            };
            return serverRequest(message);
        }

        function createAccount(account) {
            var message = {
                request_type: 'create_account',
                name: account.name,
                username: account.username,
                password: account.password,
                permission: account.permission,
                holds: account.holds,
                registrationStatus: account.registrationStatus
            };
            return serverRequest(message);
        };

        function getAccount(username) {
            var message = {
                request_type: 'get_account',
                username: username,
            };
            return serverRequest(message);
        }

        function updateAccount(account) {
            var message = {
                request_type: 'update_account',
                name: account.name,
                username: account.username,
                password: account.password,
                permission: account.permission,
                holds: account.holds,
                registrationStatus: account.registrationStatus
            };
            return serverRequest(message);
        };

        function deleteAccount(accountID) {
            var message = {
                username: accountID,
                request_type: 'delete_account',
            };
            return serverRequest(message);
        }

        function getSchedule(accountID) {
            var message = {
                username: accountID,
                request_type: 'get_schedule',
            };
            return serverRequest(message);
        }

        function login(credentials) {
            var message = {
                request_type: 'log_in',
                username: credentials.username,
                password: credentials.password
            };
            return serverRequest(message);
        }

    }
})();
