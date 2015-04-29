(function() {
    'use strict';

    angular
        .module('app.form')
        .controller('CreateCourse', CreateCourse);
        

    function CreateCourse($scope, $modalInstance, accounts, PERMISSION_TYPES, COURSE_DEFAULTS) {
        var vm = this;
        activate();

        function activate() {
            vm.course = {};
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

            vm.course.instructor = vm.instructors[0].username;
            vm.course.startTime = COURSE_DEFAULTS.times[0];
            vm.course.capacity = COURSE_DEFAULTS.capacities[0];
            vm.course.day = COURSE_DEFAULTS.days[0];

            console.log(vm.instructors);
        }

        function submit() {
            $modalInstance.close(vm.course);
        }

        function cancel() {
            $modalInstance.dismiss('Cancel');
        }

    }
})();
