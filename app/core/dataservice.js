(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    function dataservice($http) {

        var service = {
            getCoursesCatalog: getCoursesCatalog
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
                    title: 'Mechanics',
                    instructor: 'Davison',
                    time: '11:00',
                    days: 'T/R'
                },
                {
                    title: 'Mechanics',
                    instructor: 'Davison',
                    time: '11:00',
                    days: 'T/R'
                },
                {
                    title: 'Mechanics',
                    instructor: 'Davison',
                    time: '11:00',
                    days: 'T/R'
                },
                {
                    title: 'Mechanics',
                    instructor: 'Davison',
                    time: '11:00',
                    days: 'T/R'
                }
            ];
            return courses;
        };

    }
})();
