(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .config(configure);

    function configure($stateProvider, $urlRouterProvider, ACCOUNT_PERMISSIONS) {

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'Dashboard',
                controllerAs: 'vm',
                title: 'dashboard',
                data: {
                    requireLogin: true,
                    authorizedRoles: [ACCOUNT_PERMISSIONS.admin, ACCOUNT_PERMISSIONS.instructor, ACCOUNT_PERMISSIONS.student]
                }
            });
    }
})();
