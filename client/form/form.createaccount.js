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
            vm.accounts = accounts;
            vm.submit = submit;
            vm.cancel = cancel;
            vm.permissionTypes = ACCOUNT_DEFAULTS.permissions;
            vm.holds = ACCOUNT_DEFAULTS.holds;
            vm.statuses = ACCOUNT_DEFAULTS.registrationStatus;

            vm.account.name = null;
            vm.account.password = null;
            vm.account.username = null;
            vm.account.permission = PERMISSION_TYPES.student;
            vm.account.holds = ACCOUNT_DEFAULTS.holds[0];
            vm.account.registrationStatus = ACCOUNT_DEFAULTS.registrationStatus[0];
        }

        function submit() {
            var invalidUsername = false;
            for (var i = 0; i < vm.accounts.length; i++) {
                if(vm.accounts[i].username == vm.account.username) {
                    invalidUsername = true;
                }
            }
            if (!!!vm.account.name || vm.account.name.length == 0) {
                toastr.error("Error: Must enter an account name");       
            }
            else if (!!invalidUsername) {
                toastr.error("Error: Username already exists");  
            }
            else if (!!!vm.account.username || vm.account.username.length == 0) {
                toastr.error("Error: Must enter a username");       
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
