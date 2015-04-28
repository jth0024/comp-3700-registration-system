(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Topnav', Topnav);

    function Topnav($scope, $rootScope, AUTH_EVENTS, httpservice, session) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'Tiger Registration System';
        vm.logout = logout;

        activate();

        function activate() {
            vm.currentAccount = session.currentAccount;
            vm.session = session;
        }


        function logout() {
            //httpservice.logout();
            //$scope.global.setCurrentAccount(null);
            $rootScope.$broadcast(AUTH_EVENTS.logoutRequest);
        }

    }
})();
