(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('httpservice', httpservice);

    function httpservice($http, session) {

        var service = {
            getCoursesCatalog: getCoursesCatalog,
            getSchedule: getSchedule,
            login: login
        };

        return service;
        

        function getCoursesCatalog() {
            //Change code when Sam's url is working
            /*return $http.get("courses url")
                .then(function(response) {
                    return response.data;
            });*/
            var courses = [
                {
                    title: 'Renewable Energy',
                    instructor: 'Bhavnani',
                    time: ['9:30', '10:45'],
                    days: ['T','R'],
                    id: 1
                },
                {
                    title: 'Software Modeling',
                    instructor: 'Yilmaz',
                    time: ['12:30', '1:45'],
                    days: ['T','R'],
                    id: 2
                },
                {
                    title: 'Algorithms',
                    instructor: 'Chapman',
                    time: ['2:00', '3:15'],
                    days: ['T','R'],
                    id: 3
                },
                {
                    title: 'HVAC',
                    instructor: 'Dyer',
                    time: ['11:00', '12:15'],
                    days: ['T','R'],
                    id: 4
                }
            ];
            return courses;
        };

        function getSchedule(account) {
            //Change code when Sam's url is working
            /*return $http.get("schedule url")
                .then(function(response) {
                    return response.data;
            });*/
            var schedule = [
                {
                    title: 'Renewable Energy',
                    instructor: 'Bhavnani',
                    time: ['9:30', '10:45'],
                    days: ['T','R'],
                    id: 1
                },
                {
                    title: 'Software Modeling',
                    instructor: 'Yilmaz',
                    time: ['12:30', '1:45'],
                    days: ['T','R'],
                    id: 2
                },
                {
                    title: 'Algorithms',
                    instructor: 'Chapman',
                    time: ['2:00', '3:15'],
                    days: ['T','R'],
                    id: 3
                },
                {
                    title: 'HVAC',
                    instructor: 'Dyer',
                    time: ['11:00', '12:15'],
                    days: ['T','R'],
                    id: 4
                }
            ];
            return schedule;
        }

        function login(credentials) {
            
            var requestUrl = 'http://sasbartlett.com/comp3700/lib2/index.php';
            var message = {
                request_type: 'log_in',
                username: credentials.username,
                password: credentials.password
            };
            message = JSON.stringify(message);
            
            return $http({
                    method: 'POST',
                    url: requestUrl,
                    data: "message=" + message,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                .then(function(response) {
                    //session.create(response.data.name, response.data.username, response.data.permission);
                    console.log(response);
                    return response.data;
                });
        }

    }
})();
