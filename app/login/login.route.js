(function() {
    'use strict';

    angular
        .module('app.login')
        .config(configure);

    function configure($stateProvider, $urlRouterProvider, PERMISSION_TYPES) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'Login',
                controllerAs: 'vm',
                title: 'login',
                data: {
                    requireLogin: false,
                    authorizedRoles: [PERMISSION_TYPES.all]
                }
            })
    }
})();
