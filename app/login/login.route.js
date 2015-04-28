(function() {
    'use strict';

    angular
        .module('app.login')
        //.config(configure);
        .run(appRun);

    /*function configure($stateProvider, $urlRouterProvider, PERMISSION_TYPES) {

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
    }*/


    function appRun(routerHelper, PERMISSION_TYPES) {
        routerHelper.setRoutes([
            {
                state: 'login',
                    config: {
                    url: '/login',
                    templateUrl: 'app/login/login.html',
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
