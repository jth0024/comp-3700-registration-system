(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Topnav', Topnav);

    function Topnav($scope, $rootScope, AUTH_EVENTS, authservice) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'Tiger Registration System';
        vm.logout = logout;

        activate();

        function activate() {
            if($scope.global.currentAccount) {

            }
        }


        function logout() {
            authservice.logout();
            $scope.global.setCurrentAccount(null);
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        }

    }
})();
