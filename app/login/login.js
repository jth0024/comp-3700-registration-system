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
                .then(function(user) {
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    $scope.setCurrentUser(user);
                }, function() {
                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                });*/
            var user = authservice.login(credentials);
            if(!!user) {
                $scope.setCurrentUser(user);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }
            else {
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            }
        }


    }
})();
