(function() {
    'use strict';

    angular
        .module('app.catalog')
        .config(configure);

    function configure($stateProvider, $urlRouterProvider, ACCOUNT_PERMISSIONS) {

        $stateProvider
            .state('app.catalog', {
                url: '/dashboard/catalog',
                templateUrl: 'app/catalog/catalog.html',
                controller: 'Catalog',
                controllerAs: 'vm',
                title: 'catalog',
                data: {
                    //requireLogin: true,
                    authorizedRoles: [ACCOUNT_PERMISSIONS.admin, ACCOUNT_PERMISSIONS.instructor, ACCOUNT_PERMISSIONS.student]
                }
            });
    }
})();
