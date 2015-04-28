(function() {
    'use strict';

    angular
        .module('app.schedule')
        .controller('Schedule', Schedule);
        

    function Schedule($scope, httpservice) {
        var vm = this;


        activate();

        function activate() {
            if($scope.global.currentSession.isAuthenticated) {
              vm.schedule = httpservice.getSchedule($scope.global.currentSession.currentAccount);
            }            
        }

    }
})();
