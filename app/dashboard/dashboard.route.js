(function() {
    'use strict';

    angular
        .module('app.dashboard')
        //.config(configure)
        .run(appRun)

    /*function configure($stateProvider, $urlRouterProvider, PERMISSION_TYPES) {

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
    }*/

    function appRun(routerHelper, PERMISSION_TYPES) {
        routerHelper.setRoutes([
            {
                state: 'app.dashboard',
                config: {
                    url: '/dashboard',
                    templateUrl: 'app/dashboard/dashboard.html',
                    controller: 'Dashboard',
                    controllerAs: 'vm',
                    title: 'dashboard',
                    data: {
                        authorizedRoles: [PERMISSION_TYPES.admin, PERMISSION_TYPES.instructor, PERMISSION_TYPES.student]
                    }              
                }
            }
        ]); 
    }

})();
