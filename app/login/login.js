(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('Login', Login);
        

    function Login($scope, $rootScope, AUTH_EVENTS, authservice) {
        var vm = this;
        vm.authenticate = authenticate;

        activate();

        function activate() {
            //alert('activate!');
        }

        function authenticate (credentials) {
            /*Correct code if promise is returned
            authservice.login(credentials)
                .then(function(account) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.setCurrentAccount(account);
                }, function() {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });*/
            if (credentials) {
                var account = authservice.login(credentials);
                if(!!account) {
                    $scope.global.setCurrentAccount(account);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                }
                else {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                }             
            }

        }

    }
})();
