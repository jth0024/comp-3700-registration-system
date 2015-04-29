(function() {
    'use strict';

    angular
        .module('app.catalog')
        .controller('Accounts', Accounts);
        

    function Accounts($rootScope, $scope, httpservice, REQUEST_EVENTS, accounts) {
        var vm = this;

        activate();

        function activate() {
            vm.accounts = accounts;
            vm.deleteAccount = deleteAccount;
            vm.refresh = refresh;
        }

        function deleteAccount(username) {
            $rootScope.$broadcast(REQUEST_EVENTS.deleteAccount, {username: username});
        }

        function refresh() {
            httpservice.getAccountsCatalog().then(function(response) {
                vm.accounts = response;
            });
        }

    }
})();
