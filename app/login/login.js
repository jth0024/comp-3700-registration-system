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
            //alert('activate!');
        }

        function authenticate (credentials) {

            if (credentials) {
                /*httpservice.login(credentials).then(function (response) {
                        $rootScope.$broadcast(AUTH_EVENTS.loginRequest, response);
                    }, function () {
                      $rootScope.$broadcast(AUTH_EVENTS.unkownError);
                    }); 
                */
                $rootScope.$broadcast(AUTH_EVENTS.loginRequest, credentials);
            }

        }

    }
})();
