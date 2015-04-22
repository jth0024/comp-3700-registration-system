(function() {
    'use strict';

    angular
        .module('app.core')
        .service('session', session);


    function session() {

        this.create = create;
        this.destroy = destroy;

        function create(sessionId, accountId, permission) {
            this.id = sessionId;
            this.accountId = accountId;
            this.permission = permission;
        }

        function destroy() {
            this.id = null;
            this.accountId = null;
            this.permission = null;
        }

    }
})();
