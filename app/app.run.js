(function() {
	'use strict';

	angular
		.module('app')
		//.config(configure)
		.run(appRun);

	/*function configure($stateProvider, $urlRouterProvider, PERMISSION_TYPES) {

        //$urlRouterProvider.otherwise('/login');

        //all children of app state inherit requireLoging = true
        $stateProvider
            .state('app', {
                abstract: true,
                template: '<ui-view/>',
                data: {
                    requireLogin: true,
                }
            })
            .state('404', {
                url: '/404',
                templateUrl: 'app/core/404.html',
                title: '404',
                data: {
                    requireLogin: false,
                    authorizedRoles: [PERMISSION_TYPES.all]
                }
            })
	}

	function appRun(session) {
		session.create();
	}*/

    function appRun(routerHelper, PERMISSION_TYPES, session) {

        //create an unauthenticated session on app start
        session.create();

        //register the routes
        routerHelper.setRoutes([
            {
                state: 'app',
                config: {
                    abstract: true,
                    template: '<ui-view/>',
                    data: {
                        requireLogin: true,
                    }          
                }
            },
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: 'app/core/404.html',
                    title: '404',
                    data: {
                        requireLogin: false,
                        authorizedRoles: [PERMISSION_TYPES.all]
                    }        
                }
            }
        ]); 
    }

})();