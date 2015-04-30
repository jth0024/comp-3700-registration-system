(function() {
    'use strict';

    angular
        .module('app.catalog')
        .controller('Assigned', Assigned);
        

    function Assigned($rootScope, $scope, httpservice, REQUEST_EVENTS, schedule) {
        var vm = this;


        activate();

        function activate() {
            //vm.schedule = httpservice.getSchedule($scope.global.currentSession.currentAccount.accountID);   
            vm.assignedCourses = schedule.courseList;  
            vm.numCourses = schedule.numCourses;
        }
    }
})();
