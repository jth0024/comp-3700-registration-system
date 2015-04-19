(function() {
    'use strict';

    angular
        .module('app.core')
        .service('session', session);


    function session() {

        this.create = create;
        this.destroy = destroy;

        function create(sessionId, accountId, accountPermission) {
            this.id = sessionId;
            this.accountId = accountId;
            this.accountPermission = accountPermission;
        }

        function destroy() {
            this.id = null;
            this.accountId = null;
            this.accountPermission = null;
        }

    }
})();