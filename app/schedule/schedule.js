(function() {
    'use strict';

    angular
        .module('app.schedule')
        .controller('Schedule', Schedule);
        

    function Schedule($scope, httpservice) {
        var vm = this;


        activate();

        function activate() {
            if($scope.global.currentAccount) {
              vm.schedule = httpservice.getSchedule(vm.currentAccount);
            }            
        }

    }
})();
