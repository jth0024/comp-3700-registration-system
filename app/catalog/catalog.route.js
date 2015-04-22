(function() {
    'use strict';

    angular
        .module('app.catalog')
        .config(configure);

    function configure($stateProvider, $urlRouterProvider, PERMISSION_TYPES) {

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
    }
})();
