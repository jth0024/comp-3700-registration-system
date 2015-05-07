(function() {
    'use strict';

    angular
        .module('app.form')
        .controller('EditCourse', EditCourse);
        

    function EditCourse($scope, $modalInstance, accounts, courses, course, PERMISSION_TYPES, COURSE_DEFAULTS) {
        var vm = this;
        activate();

        function activate() {
            vm.course = course;
            vm.courses = courses;
            vm.submit = submit;
            vm.cancel = cancel;
            vm.instructors = [];
            vm.availableTimes = COURSE_DEFAULTS.times;
            vm.courseCapacities = COURSE_DEFAULTS.capacities;
            vm.courseDays = COURSE_DEFAULTS.days;

            for (var i=0; i < accounts.length; i++) {
                if(accounts[i].permission == PERMISSION_TYPES.instructor) {
                    vm.instructors.push(accounts[i]);
                }
            }
        }

        function submit() {
            $modalInstance.close(vm.course);
        }

        function cancel() {
            $modalInstance.dismiss('Cancel');
        }

    }
})();
