(function() {
    'use strict';

    angular
        .module('app.detail')
        .run(appRun)

    function appRun(routerHelper, PERMISSION_TYPES) {
        routerHelper.setRoutes([
            {
                state: 'app.registration',
                config: {
                    url: '/dashboard/details/registration',
                    templateUrl: 'app/detail/detail.registration.html',
                    //controller: 'Registration',
                    //controllerAs: 'vm',
                    title: 'registration',
                    data: {
                        authorizedRoles: [PERMISSION_TYPES.admin, PERMISSION_TYPES.student]
                    }              
                }
            }
        ]); 
    }

})();
