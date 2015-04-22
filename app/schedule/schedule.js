(function() {
    'use strict';

    angular
        .module('app.schedule')
        .controller('Schedule', Schedule);
        

    function Schedule($scope, dataservice) {
        var vm = this;


        activate();

        function activate() {
            if($scope.global.currentAccount) {
              vm.schedule = dataservice.getSchedule(vm.currentAccount);
            }            
        }

    }
})();
