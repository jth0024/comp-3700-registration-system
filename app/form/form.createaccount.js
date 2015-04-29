(function() {
    'use strict';

    angular
        .module('app.form')
        .controller('CreateAccount', CreateAccount);
        

    function CreateAccount($scope, $modalInstance, accounts, PERMISSION_TYPES, ACCOUNT_DEFAULTS) {
        var vm = this;
        activate();

        function activate() {
            vm.account = {};
            vm.submit = submit;
            vm.cancel = cancel;
            vm.permissionTypes = ACCOUNT_DEFAULTS.permissions;
            vm.holds = ACCOUNT_DEFAULTS.holds;
            vm.statuses = ACCOUNT_DEFAULTS.registrationStatus;

            vm.account.permission = PERMISSION_TYPES.student;

            vm.account.holds = ACCOUNT_DEFAULTS.holds[0];
            vm.account.registrationStatus = ACCOUNT_DEFAULTS.registrationStatus[0];
        }

        function submit() {
            $modalInstance.close(vm.account);
        }

        function cancel() {
            $modalInstance.dismiss('Cancel');
        }

    }
})();
