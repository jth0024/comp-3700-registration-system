(function() {
    'use strict';

    angular
        .module('app.schedule')
        .config(configure);

    function configure($stateProvider, $urlRouterProvider, PERMISSION_TYPES) {

        $stateProvider
            .state('app.schedule', {
                url: '/dashboard/schedule',
                templateUrl: 'app/schedule/schedule.html',
                controller: 'Schedule',
                controllerAs: 'vm',
                title: 'schedule',
                data: {
                    //requireLogin: true,
                    authorizedRoles: [PERMISSION_TYPES.admin, PERMISSION_TYPES.instructor, PERMISSION_TYPES.student]
                }
            })
            .state('app.editschedule', {
                url: '/dashboard/schedule/edit',
                templateUrl: 'app/schedule/editschedule.html',
                controller: 'Schedule',
                controllerAs: 'vm',
                title: 'editschedule',
                data: {
                    //requireLogin: true,
                    authorizedRoles: [PERMISSION_TYPES.admin, PERMISSION_TYPES.student]
                }
            });
    }
})();
