(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('Login', Login);
        

    function Login($scope, $rootScope, AUTH_EVENTS, httpservice) {
        var vm = this;
        vm.authenticate = authenticate;

        activate();

        function activate() {

        }

        function authenticate (credentials) {

            if (credentials) {
                $rootScope.$broadcast(AUTH_EVENTS.loginRequest, credentials);
            }

        }

    }
})();
