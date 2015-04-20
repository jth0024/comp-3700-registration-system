(function() {
    'use strict';

    angular
        .module('app.core')
        .config(configure);

    function configure($stateProvider, $urlRouterProvider, ACCOUNT_PERMISSIONS) {

        $stateProvider
            .state('404', {
                url: '/404',
                templateUrl: 'app/core/404.html',
                title: '404',
                data: {
                    requireLogin: false,
                    authorizedRoles: [ACCOUNT_PERMISSIONS.all]
                }
            });
    }

})();