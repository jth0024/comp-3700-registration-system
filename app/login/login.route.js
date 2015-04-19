(function() {
    'use strict';

    angular
        .module('app.login')
        .config(configure);

    function configure($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'Login',
                controllerAs: 'vm',
                title: 'login',
                data: {
                    requireLogin: false
                }
            })
    }
})();
