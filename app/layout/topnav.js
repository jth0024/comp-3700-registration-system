(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Topnav', Topnav);

    function Topnav($scope) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'Tiger Registration System';

        activate();

        function activate() {
            if($scope.currentUser) {
              vm.currentUser = $scope.currentUser; 
              console.log(vm.accountPermissions.student == vm.currentUser.role); 
            }
        }

    }
})();
