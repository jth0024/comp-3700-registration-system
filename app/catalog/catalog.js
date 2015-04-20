(function() {
    'use strict';

    angular
        .module('app.catalog')
        .controller('Catalog', Catalog);
        

    function Catalog($scope, dataservice) {
        var vm = this;
        vm.currentUser = null;
        vm.accountPermissions = $scope.accountPermissions;
        activate();

        function activate() {
            if($scope.currentUser) {
              vm.currentUser = $scope.currentUser; 
              console.log(vm.accountPermissions.student == vm.currentUser.role); 
            }

            vm.courses = dataservice.getCoursesCatalog();
            
        }

    }
})();
