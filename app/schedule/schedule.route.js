(function() {
    'use strict';

    angular
        .module('app.schedule')
        //.config(configure);
        .run(appRun);

    /*function configure($stateProvider, $urlRouterProvider, PERMISSION_TYPES) {

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
    }*/



    function appRun(routerHelper, PERMISSION_TYPES) {
        routerHelper.setRoutes([
            {
                state: 'app.schedule',
                config: {
                    url: '/dashboard/schedule',
                    templateUrl: 'app/schedule/schedule.html',
                    controller: 'Schedule',
                    controllerAs: 'vm',
                    title: 'schedule',
                    data: {
                        //requireLogin: true,
                        authorizedRoles: [PERMISSION_TYPES.admin, PERMISSION_TYPES.instructor, PERMISSION_TYPES.student]
                    }            
                }
            },
            {
                state: 'app.editschedule',
                config: {
                    url: '/dashboard/schedule/edit',
                    templateUrl: 'app/schedule/editschedule.html',
                    controller: 'Schedule',
                    controllerAs: 'vm',
                    title: 'editschedule',
                    data: {
                        //requireLogin: true,
                        authorizedRoles: [PERMISSION_TYPES.admin, PERMISSION_TYPES.student]
                    }           
                }
            }
        ]); 
    }

})();
