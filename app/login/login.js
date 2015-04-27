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
                httpservice.login(credentials).then(function (response) {
                        if (!!response.error) {
                            $rootScope.$broadcast(AUTH_EVENTS.loginFailed, response);
                        }
                        else {
                            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, response); 
                        }
                        
                        //console.log
                    }, function () {
                      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    });         
            }

        }

    }
})();
