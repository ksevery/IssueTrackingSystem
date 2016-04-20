angular.module('issueTrackingSystem.users.logout', [])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/logout', {
                resolve: {
                    logout: ['$location', 'authentication', function($location, authentication){
                        authentication.logout();
                        $location.path('/');
                    }]
                }
            })
        }]);