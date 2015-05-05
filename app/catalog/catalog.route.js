(function() {
    'use strict';

    angular
        .module('app.catalog')
        .run(appRun);

    function appRun(routerHelper, PERMISSION_TYPES, httpservice, session) {
        routerHelper.setRoutes([
            {
                state: 'app.courses',
                config: {
                    resolve: {
                        courses:  function(httpservice) {
                            // $http returns a promise for the url data
                            return httpservice.getCoursesCatalog();
                        },
                        schedule: function(httpservice) {
                            return httpservice.getSchedule(session.currentAccount.username);
                        }
                    },
                    url: '/dashboard/catalog/courses',
                    templateUrl: 'app/catalog/catalog.courses.html',
                    controller: 'Courses',
                    controllerAs: 'vm',
                    title: 'courses',
                    data: {
                        authorizedRoles: [PERMISSION_TYPES.admin, PERMISSION_TYPES.student]
                    }              
                }
            },
            {
                state: 'app.registered',
                config: {
                    resolve: {
                        schedule:  function(httpservice){
                            // $http returns a promise for the url data
                            return httpservice.getSchedule(session.currentAccount.username);
                        }
                    },
                    url: '/dashboard/catalog/registered',
                    templateUrl: 'app/catalog/catalog.registered.html',
                    controller: 'Registered',
                    controllerAs: 'vm',
                    title: 'registered',
                    data: {
                        authorizedRoles: [PERMISSION_TYPES.student]
                    }              
                }
            },
            {
                state: 'app.assigned',
                config: {
                    resolve: {
                        schedule:  function(httpservice){
                            // $http returns a promise for the url data
                            return httpservice.getSchedule(session.currentAccount.username);
                        }
                    },
                    url: '/dashboard/catalog/assigned',
                    templateUrl: 'app/catalog/catalog.assigned.html',
                    controller: 'Assigned',
                    controllerAs: 'vm',
                    title: 'assigned',
                    data: {
                        authorizedRoles: [PERMISSION_TYPES.instructor]
                    }              
                }
            },
            {
                state: 'app.accounts',
                config: {
                    resolve: {
                        accounts:  function(httpservice){
                            // $http returns a promise for the url data
                            return httpservice.getAccountsCatalog();
                        }
                    },
                    url: '/dashboard/catalog/accounts',
                    templateUrl: 'app/catalog/catalog.accounts.html',
                    controller: 'Accounts',
                    controllerAs: 'vm',
                    title: 'accounts',
                    data: {
                        authorizedRoles: [PERMISSION_TYPES.admin]
                    }             
                }
            }
        ]); 
    }

})();
