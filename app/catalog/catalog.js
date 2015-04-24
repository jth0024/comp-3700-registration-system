(function() {
    'use strict';

    angular
        .module('app.catalog')
        .controller('Catalog', Catalog);
        

    function Catalog($scope, httpservice) {
        var vm = this;


        activate();

        function activate() {
            if($scope.global.currentAccount) {
                vm.courses = httpservice.getCoursesCatalog();
            }            
        }

    }
})();
