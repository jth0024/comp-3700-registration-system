(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);
        

    function Dashboard($scope) {
        var vm = this;
        activate();

        function activate() {
            /*if($scope.global.currentAccount) {
              vm.currentAccount = $scope.global.currentSession.currentAccount; 
            }*/
            
        }

    }
})();
