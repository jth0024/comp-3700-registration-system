(function() {
    'use strict';

    angular
        .module('app.login')
        .config(configure);

    function configure($stateProvider, $urlRouterProvider, ACCOUNT_PERMISSIONS) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'Login',
                controllerAs: 'vm',
                title: 'login',
                data: {
                    requireLogin: false,
                    authorizedRoles: [ACCOUNT_PERMISSIONS.all]
                }
            })
    }
})();
