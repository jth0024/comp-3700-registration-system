(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);
        

    function Dashboard($scope, $rootScope, REQUEST_EVENTS) {
        var vm = this;
        activate();

        function activate() {
            vm.createCourseForm = createCourseForm;
            vm.createAccountForm = createAccountForm;
        }

        function createCourseForm() {
            $rootScope.$broadcast(REQUEST_EVENTS.createCourse);
        }

        function createAccountForm() {
            $rootScope.$broadcast(REQUEST_EVENTS.createAccount);
        }

    }
})();
