(function() {
    'use strict';

    angular
        .module('app.catalog')
        //.config(configure);
        .run(appRun);

    /*function configure($stateProvider, $urlRouterProvider, PERMISSION_TYPES) {

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
    }*/


    function appRun(routerHelper, PERMISSION_TYPES, httpservice, session) {
        routerHelper.setRoutes([
            {
                state: 'app.courses',
                config: {
                    resolve: {
                        courses:  function(httpservice){
                            // $http returns a promise for the url data
                            return httpservice.getCoursesCatalog();
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
                        registeredCourses:  function(httpservice){
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
