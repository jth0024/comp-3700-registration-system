(function() {
    'use strict';

    angular
        .module('app.schedule')
        .run(appRun);

    function appRun(routerHelper, PERMISSION_TYPES, httpservice, session) {
        routerHelper.setRoutes([
            {
                state: 'app.schedule',
                config: {
                    resolve: {
                        currentSchedule:  function(httpservice){
                            // $http returns a promise for the url data
                            return httpservice.getSchedule(session.currentAccount.username);
                        }
                    },
                    url: '/dashboard/schedule',
                    templateUrl: 'app/schedule/schedule.html',
                    controller: 'Schedule',
                    controllerAs: 'vm',
                    title: 'schedule',
                    data: {
                        //requireLogin: true,
                        authorizedRoles: [PERMISSION_TYPES.instructor, PERMISSION_TYPES.student]
                    }            
                }
            }
        ]); 
    }

})();
