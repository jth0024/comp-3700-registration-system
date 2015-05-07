(function() {
    'use strict';

    angular
        .module('app.core')
        .service('session', session);


    function session() {
        this.create = create;
        this.destroy = destroy;
        this.authenticate = authenticate;
        this.unAuthenticate = unAuthenticate;
        this.isAuthenticated = isAuthenticated;
        this.isAuthorized = isAuthorized;

        function create() {
            this.authenticated = false;
        }

        function destroy() {
            this.currentAccount = null;
            this.authenticated = null;
        }

        function authenticate(account) {
            this.currentAccount = account;
            this.authenticated = true;
        }

        function unAuthenticate() {
            this.currentAccount = null;
            this.authenticated = false;
        }

        function isAuthenticated() {
            return !!this.authenticated;
        }

        function isAuthorized(authorizedPermissions) {
            if (!angular.isArray(authorizedPermissions)) {
                authorizedPermissions = [authorizedPermissions];
            }
            return (this.isAuthenticated() && authorizedPermissions.indexOf(this.currentAccount.permission) !== -1);
        }

    }
})();
