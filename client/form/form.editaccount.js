(function() {
    'use strict';

    angular
        .module('app.form')
        .controller('EditAccount', EditAccount);
        

    function EditAccount($scope, $modalInstance, accounts, account, PERMISSION_TYPES, ACCOUNT_DEFAULTS) {
        var vm = this;
        activate();

        function activate() {
            vm.account = account;
            vm.submit = submit;
            vm.cancel = cancel;
            vm.permissionTypes = ACCOUNT_DEFAULTS.permissions;
            vm.holds = ACCOUNT_DEFAULTS.holds;
            vm.statuses = ACCOUNT_DEFAULTS.registrationStatus;
        }

        function submit() {
            if (!!!vm.account.name || vm.account.name.length == 0) {
                toastr.error("Error: Must enter an account name");       
            }
            else if (!!!vm.account.password || vm.account.password.length == 0) {
                toastr.error("Error: Must enter a password");       
            }
            else {
                $modalInstance.close(vm.account);
            }
        }

        function cancel() {
            $modalInstance.dismiss('Cancel');
        }

    }
})();
