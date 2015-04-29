(function() {
    'use strict';

    angular
        .module('app.catalog')
        .controller('Registered', Registered);
        

    function Registered($rootScope, $scope, httpservice, REQUEST_EVENTS, registeredCourses) {
        var vm = this;
        vm.dropCourse = dropCourse;
        vm.refresh = refresh;


        activate();

        function activate() {
            //vm.schedule = httpservice.getSchedule($scope.global.currentSession.currentAccount.accountID);   
            vm.registeredCourses = registeredCourses.courseList;  
            vm.numCourses = registeredCourses.numCourses;     
        }

        function dropCourse(username, courseID, name) {
            $rootScope.$broadcast(REQUEST_EVENTS.dropCourse, {username: username, courseID: courseID, name:name});
        }

        function refresh() {
            httpservice.getSchedule($scope.global.currentSession.currentAccount.username).then(function(response) {
                vm.registeredCourses = response.courseList;
                vm.numCourses = response.numCourses;
            });
        }

    }
})();
