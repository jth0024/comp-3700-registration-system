(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    //dataservice.$inject = ['$http', '$location', '$q'];
    function dataservice($http, $location, $q) {
        var isPrimed = false;
        var primePromise;

        var service = {
            getPosts: getPosts,
            getProjects: getProjects,
            authenticateLogin: authenticateLogin,
            ready: ready
        };

        return service;
        

        function getProjects() {
            var projects = [
                {id: "rp_media", title: "RP Media", image_url: "content/images/rpmedia.png", description: "RP Media is a Huntsville, Alabama based advertising/consulting company. The image above is a screenshot of some web design/prototype work that I completed for the company."},
                {id: "russell_hospital", title: "Russell Hospital", image_url: "content/images/rhmain.png", description: "Russell Medical Center is located in Alexander City, Alabama. Along with five other students, I participated in a senior design project that required the development of an HVAC control system for the medical center's facilities. As the web interface team lead, I was tasked with designing a functional interface to display data from Russell's various air handlers, boilers, chillers, etc. The screenshot above is of the system summary tab, which displays maintenance, reminders, and summaries. In addition to developing the web interface, I also worked extensively with the bacPypes Python library and Flask to develop PLC and server-side software, respectively."},
                {id: "calendar_time", title: "Calendar Time", image_url: "content/images/calendartime1.png", description: "Calendar Time is a fun and whimsical social calendar app. The idea is rather simple; to replace pesky, hard-to-follow group invite messages with a simple and ephemeral social calendar. The app is still under development and the above image displays an interface mock up for the app, which I'm expecting to complete in 2015."}
            ];
            return $q.when(projects);
        }

        function getPosts() {
            return $http.get("https://www.googleapis.com/blogger/v3/blogs/7831823033313363717/posts?key=AIzaSyBntQw8Opl1Zu6vIB1pgAmaqHdpd5RiYtI")
                .then(function(response) {
                    return response.data;
            });
        };

        function authenticateLogin(username, password) {
            if (username == "jhurt" && password == "gethurt10") {
                return true;
            }
            return false;
        }

        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                //logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function() { return $q.all(nextPromises); })
                .catch(
                    //exception.catcher('"ready" function failed')
                );
        }

    }
})();
