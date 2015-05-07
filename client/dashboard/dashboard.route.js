(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun)

    function appRun(routerHelper, PERMISSION_TYPES) {
        routerHelper.setRoutes([
            {
                state: 'app.dashboard',
                config: {
                    url: '/dashboard',
                    templateUrl: 'client/dashboard/dashboard.html',
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
