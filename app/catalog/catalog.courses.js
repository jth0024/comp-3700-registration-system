(function() {
    'use strict';

    angular
        .module('app.catalog')
        .controller('Courses', Courses);
        

    function Courses($rootScope, $scope, httpservice, courses, REQUEST_EVENTS) {
        var vm = this;


        activate();

        function activate() {
            //vm.courses = httpservice.getCoursesCatalog();
            vm.courses = courses; 
            vm.addToCourse = addToCourse;
            vm.deleteCourse = deleteCourse;
            vm.refresh = refresh;        
        }

        function addToCourse(username, courseID, name) {
            $rootScope.$broadcast(REQUEST_EVENTS.addToCourse, {username: username, courseID: courseID, name: name});
        }

        function deleteCourse(courseID, name) {
            $rootScope.$broadcast(REQUEST_EVENTS.removeCourse, {courseID: courseID, name: name});
        }

        function refresh() {
            httpservice.getCoursesCatalog().then(function(response) {
                vm.courses = response;
            });
        }
    }
})();
