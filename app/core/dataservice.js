(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    function dataservice($http) {

        var service = {
            getCoursesCatalog: getCoursesCatalog,
            getSchedule: getSchedule
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
                    days: ['T','R']
                },
                {
                    title: 'Software Modeling',
                    instructor: 'Yilmaz',
                    time: ['12:30', '1:45'],
                    days: ['T','R']
                },
                {
                    title: 'Algorithms',
                    instructor: 'Chapman',
                    time: ['2:00', '3:15'],
                    days: ['T','R']
                },
                {
                    title: 'HVAC',
                    instructor: 'Dyer',
                    time: ['11:00', '12:15'],
                    days: ['T','R']
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
                    days: ['T','R']
                },
                {
                    title: 'Software Modeling',
                    instructor: 'Yilmaz',
                    time: ['12:30', '1:45'],
                    days: ['T','R']
                },
                {
                    title: 'Algorithms',
                    instructor: 'Chapman',
                    time: ['2:00', '3:15'],
                    days: ['T','R']
                },
                {
                    title: 'HVAC',
                    instructor: 'Dyer',
                    time: ['11:00', '12:15'],
                    days: ['T','R']
                }
            ];
            return schedule;
        }

    }
})();
