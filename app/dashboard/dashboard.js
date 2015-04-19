(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('Dashboard', Dashboard);
        

    function Dashboard($scope) {
        var vm = this;
        vm.currentUser = null;
        vm.accountPermissions = $scope.accountPermissions;
        activate();

        function activate() {
            if($scope.currentUser) {
              vm.currentUser = $scope.currentUser; 
              console.log(vm.accountPermissions.student == vm.currentUser.role); 
            }
            
        }

    }
})();
