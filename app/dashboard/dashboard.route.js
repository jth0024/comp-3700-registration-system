(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .config(configure);

    function configure($stateProvider, $urlRouterProvider, PERMISSION_TYPES) {

        $stateProvider
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'Dashboard',
                controllerAs: 'vm',
                title: 'dashboard',
                data: {
                    authorizedRoles: [PERMISSION_TYPES.admin, PERMISSION_TYPES.instructor, PERMISSION_TYPES.student]
                }
            });
    }
})();
