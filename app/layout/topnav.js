(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Topnav', Topnav);

    function Topnav() {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'Tiger Registration System';
    }
})();
