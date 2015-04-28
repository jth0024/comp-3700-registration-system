(function() {
    'use strict';

    angular
        .module('app.catalog')
        .controller('Registered', Registered);
        

    function Registered($rootScope, $scope, httpservice, REQUEST_EVENTS, registeredCourses) {
        var vm = this;
        vm.dropCourse = dropCourse;
        //vm.refresh = refresh;


        activate();

        function activate() {
            //vm.schedule = httpservice.getSchedule($scope.global.currentSession.currentAccount.accountID);   
            vm.registeredCourses = registeredCourses;       
        }

        function dropCourse(courseID) {
            $rootScope.$broadcast(REQUEST_EVENTS.dropCourseRequest, {id: courseID});
        }

        /*function refresh() {
            vm.schedule = httpservice.getSchedule($scope.global.currentSession.currentAccount.accountID);
        }*/

    }
})();
