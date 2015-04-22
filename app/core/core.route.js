(function() {
    'use strict';

    angular
        .module('app.core')
        .config(configure);

    function configure($stateProvider, $urlRouterProvider, PERMISSION_TYPES) {

        $stateProvider
            .state('404', {
                url: '/404',
                templateUrl: 'app/core/404.html',
                title: '404',
                data: {
                    requireLogin: false,
                    authorizedRoles: [PERMISSION_TYPES.all]
                }
            });
    }

})();