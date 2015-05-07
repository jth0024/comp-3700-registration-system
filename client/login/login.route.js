(function() {
    'use strict';

    angular
        .module('app.login')
        .run(appRun);

    function appRun(routerHelper, PERMISSION_TYPES) {
        routerHelper.setRoutes([
            {
                state: 'login',
                    config: {
                    url: '/login',
                    templateUrl: 'client/login/login.html',
                    controller: 'Login',
                    controllerAs: 'vm',
                    title: 'login',
                    data: {
                        requireLogin: false,
                        authorizedRoles: [PERMISSION_TYPES.all]
                    }            
                }
            }
        ]); 
    }

})();
