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
        }

    }
})();
