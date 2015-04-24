(function() {
    'use strict';

    angular
        .module('app.core')
        .service('session', session);


    function session() {

        this.create = create;
        this.destroy = destroy;

        function create(name, username, permission) {
            this.name = name;
            this.accountId = username;
            this.permission = permission;
        }

        function destroy() {
            this.name = null;
            this.accountId = null;
            this.permission = null;
        }

    }
})();
