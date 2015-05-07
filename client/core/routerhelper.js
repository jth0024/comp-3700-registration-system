
/* Help configure the state-base ui.router */
(function() {
    'use strict';

    angular
        .module('app.core')
        .provider('routerHelper', routerHelperProvider);

    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        var config = {
            resolveAlways: {}
        };

        //$locationProvider.html5Mode(true);

        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;

        function RouterHelper($location, $rootScope, $state, session, AUTH_EVENTS) {

            var service = {
                setRoutes: setRoutes,
                go: go
            };

            init();

            return service;

            ///////////////

            function setRoutes(states) {
                states.forEach(function(state) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
            }

            function go(stateName) {
                $state.go(stateName);
            }

            function handleRoutingErrors() {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                    function(event, toState, toParams, fromState, fromParams, error) {
                        $location.path('/dashboard');
                    }
                );

                $rootScope.$on('$stateNotFound', function(event) {
                    event.preventDefault();
                    $state.go('404');
                });

                $urlRouterProvider.otherwise('/login');
            }

            function handleStateChange() {
                $rootScope.$on('$stateChangeStart', function (event, next, nextParams) {
                    var requireLogin = next.data.requireLogin;
                    var authorizedRoles = next.data.authorizedRoles;
                    console.log(session.isAuthorized(authorizedRoles));
                    if(requireLogin && !session.isAuthorized(authorizedRoles)) {
                        event.preventDefault();
                        if (session.isAuthenticated()) {
                            //User doesn't have permission
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        }
                        else {
                            //User isn't logging in
                            $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                            $state.go('login');
                        }
                    }
                    else {
                        console.log("authorized");
                    }

                });
            }

            function init() {
                handleRoutingErrors();
                handleStateChange();
            }

        }
    }
})();
