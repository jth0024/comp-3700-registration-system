(function() {
    'use strict';

    angular
        .module('app.detail')
        .controller('Course', Course);
        

    function Course($scope, course) {
        var vm = this;
        activate();

        function activate() {
            vm.courseDetails = course;
            
            if (vm.courseDetails.numEnrolled == 0) {
                vm.percentFilled = 0;
            }
            else {
                vm.percentFilled = vm.courseDetails.numEnrolled / vm.courseDetails.capacity * 100;  
            }
            
            if (vm.percentFilled > 75) {
                vm.progressStyle = 'progress-bar progress-bar-danger';
            }
            else {
                if (vm.percentFilled > 50) {
                    vm.progressStyle = 'progress-bar progress-bar-warning';
                }
                else {
                    vm.progressStyle = 'progress-bar progress-bar-success';
                }
            }
        }

    }
})();
