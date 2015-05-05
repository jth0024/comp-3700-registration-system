(function() {
    'use strict';

    angular
        .module('app.catalog')
        .controller('Courses', Courses);
        

    function Courses($rootScope, $scope, httpservice, courses, schedule, toastr, REQUEST_EVENTS) {
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
            vm.courseSchedule = schedule.courseList;
            console.log(vm.courseSchedule);
        }

        function addToCourse(username, courseID, name) {
            if (!!!name) {
                for(var i = 0; i < vm.courses.length; i++) {
                    if(courses[i].id == courseID) {
                        name = courses[i].name;
                    }
                }
            }
            if (!alreadyRegistered(courseID)) {
                $rootScope.$broadcast(REQUEST_EVENTS.addToCourse, {username: username, courseID: courseID, name: name});
            }
            else {
                toastr.error('Error: already registered for this course!');
            }
            httpservice.getSchedule($scope.global.currentSession.currentAccount.username).then(function(response) {
                vm.courseSchedule = response.courseList;
            });
        }

        function quickAddToCourse(username, courseID) {
            for(var i = 0; i < vm.courses.length; i++) {
                if(courses[i].id == courseID) {
                    var name = courses[i].name;
                    if(!alreadyRegistered(courseID)) {
                        $rootScope.$broadcast(REQUEST_EVENTS.addToCourse, {username: username, courseID: courseID, name: name});
                        httpservice.getSchedule($scope.global.currentSession.currentAccount.username).then(function(response) {
                            vm.courseSchedule = response.courseList;
                        });
                        return;                       
                    }
                    else {
                        toastr.error('Error: already registered for this course!');
                        return;
                    }
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

        function alreadyRegistered(courseID) {
            for(var i = 0; i < vm.courseSchedule.length; i++) {
                if(courseID == vm.courseSchedule[i].id) {
                    return true;
                }
            }
            return false;
        }
    }
})();
