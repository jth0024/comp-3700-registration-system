(function() {
    'use strict';

    angular
        .module('app.catalog')
        .controller('Registered', Registered);
        

    function Registered($rootScope, $scope, httpservice, REQUEST_EVENTS, schedule) {
        var vm = this;
        vm.dropCourse = dropCourse;
        vm.refresh = refresh;


        activate();

        function activate() { 
            vm.registeredCourses = schedule.courseList;  
            vm.numCourses = schedule.numCourses;     
        }

        function dropCourse(username, courseID, name) {
            $rootScope.$broadcast(REQUEST_EVENTS.dropCourse, {username: username, courseID: courseID, name:name});
        }

        function refresh() {
            httpservice.getSchedule($scope.global.currentSession.currentAccount.username).then(function(schedule) {
                vm.registeredCourses = schedule.courseList;
                vm.numCourses = schedule.numCourses;
            });
        }

    }
})();
