(function() {
    'use strict';

    angular
        .module('app.detail')
        .controller('Registration', Registration);
        

    function Registration($scope) {
        var vm = this;
        activate();

        function activate() {
            //vm.currentAccount = $scope.global.currentSession.currentAccount;            
        }

    }
})();
