(function() {
    'use strict';

    angular
        .module('app.catalog')
        .controller('Courses', Courses);
        

    function Courses($scope, httpservice, courses) {
        var vm = this;


        activate();

        function activate() {
            //vm.courses = httpservice.getCoursesCatalog();
            vm.courses = courses;          
        }

    }
})();
