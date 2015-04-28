(function() {
    'use strict';

    angular
        .module('app.catalog')
        //.config(configure);
        .run(appRun);

    /*function configure($stateProvider, $urlRouterProvider, PERMISSION_TYPES) {

        $stateProvider
            .state('app.catalog', {
                url: '/dashboard/catalog',
                templateUrl: 'app/catalog/catalog.html',
                controller: 'Catalog',
                controllerAs: 'vm',
                title: 'catalog',
                data: {
                    //requireLogin: true,
                    authorizedRoles: [PERMISSION_TYPES.admin, PERMISSION_TYPES.instructor, PERMISSION_TYPES.student]
                }
            });
    }*/


    function appRun(routerHelper, PERMISSION_TYPES) {
        routerHelper.setRoutes([
            {
                state: 'app.catalog',
                config: {
                    url: '/dashboard/catalog',
                    templateUrl: 'app/catalog/catalog.html',
                    controller: 'Catalog',
                    controllerAs: 'vm',
                    title: 'catalog',
                    data: {
                        authorizedRoles: [PERMISSION_TYPES.admin, PERMISSION_TYPES.instructor, PERMISSION_TYPES.student]
                    }              
                }
            },
            {
                state: 'app.registered',
                config: {
                    url: '/dashboard/catalog/registered',
                    templateUrl: 'app/catalog/catalog.registered.html',
                    controller: 'Registered',
                    controllerAs: 'vm',
                    title: 'registered',
                    data: {
                        authorizedRoles: [PERMISSION_TYPES.student]
                    }              
                }
            }
        ]); 
    }

})();
