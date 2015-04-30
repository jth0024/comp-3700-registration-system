(function() {
    'use strict';

    angular
        .module('app.catalog')
        .controller('Courses', Courses);
        

    function Courses($rootScope, $scope, httpservice, courses, toastr, REQUEST_EVENTS) {
        var vm = this;


        activate();

        function activate() {
            vm.quickID;
            vm.courses = courses; 
            vm.addToCourse = addToCourse;
            vm.quickAddToCourse = quickAddToCourse;
            vm.deleteCourse = deleteCourse;
            vm.editCourse = editCourse;
            vm.refresh = refresh;
        }

        function addToCourse(username, courseID, name) {
            if (!!!name) {
                for(var i = 0; i < vm.courses.length; i++) {
                    if(courses[i].id == courseID) {
                        name = courses[i].name;
                    }
                }
            }
            $rootScope.$broadcast(REQUEST_EVENTS.addToCourse, {username: username, courseID: courseID, name: name});
        }

        function quickAddToCourse(username, courseID) {
            for(var i = 0; i < vm.courses.length; i++) {
                if(courses[i].id == courseID) {
                    var name = courses[i].name;
                    $rootScope.$broadcast(REQUEST_EVENTS.addToCourse, {username: username, courseID: courseID, name: name});
                }
            }
            toastr.error('ERROR: Not a valid course ID');
        }

        function deleteCourse(courseID, name) {
            $rootScope.$broadcast(REQUEST_EVENTS.removeCourse, {courseID: courseID, name: name});
        }

        function editCourse(courseID, name) {
            $rootScope.$broadcast(REQUEST_EVENTS.editCourse, {courseID: courseID, name: name});
        }

        function refresh() {
            httpservice.getCoursesCatalog().then(function(response) {
                vm.courses = response;
            });
        }
    }
})();
