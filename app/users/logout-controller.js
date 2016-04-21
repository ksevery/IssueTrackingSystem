angular.module('issueTrackingSystem.users.logout', [])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/logout', {
                resolve: {
                    logout: ['$location', 'authentication', 'Notification', function($location, authentication, Notification){
                        authentication.logout();
                        Notification.success('Logout succesfull!');
                        $location.path('/');
                    }]
                }
            })
        }]);