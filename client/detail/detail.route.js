(function() {
    'use strict';

    angular
        .module('app.detail')
        .run(appRun)

    function appRun(routerHelper, PERMISSION_TYPES) {
        routerHelper.setRoutes([
            {
                state: 'app.registration',
                config: {
                    url: '/dashboard/details/registration',
                    templateUrl: 'client/detail/detail.registration.html',
                    //controller: 'Registration',
                    //controllerAs: 'vm',
                    title: 'registration',
                    data: {
                        authorizedRoles: [PERMISSION_TYPES.admin, PERMISSION_TYPES.student]
                    }              
                }
            },
            {
                state: 'app.course',
                config: {
                    resolve: {
                        course:  function(httpservice, $stateParams){
                            // $http returns a promise for the url data
                            return httpservice.getCourse($stateParams.courseID);
                        }
                    },
                    url: '/dashboard/details/course/:courseID',
                    templateUrl: 'client/detail/detail.course.html',
                    controller: 'Course',
                    controllerAs: 'vm',
                    title: 'course',
                    data: {
                        authorizedRoles: [PERMISSION_TYPES.instructor]
                    }              
                }
            },
        ]); 
    }

})();
