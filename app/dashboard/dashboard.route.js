(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .config(configure);

    function configure($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'Dashboard',
                controllerAs: 'vm',
                title: 'dashboard'
            });
    }
})();
