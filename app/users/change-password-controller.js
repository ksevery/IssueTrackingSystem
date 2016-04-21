angular.module('issueTrackingSystem.users.changePassword', [])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/profile/password', {
                controller: 'ProfileController',
                templateUrl: 'app/users/change-password.html',
                resolve: {
                    access: ['$location', 'identity', function($location, identity){
                        if(!identity.isAuthenticated()){
                            $location.path('/');
                        }
                    }]
                }
            })
        }])
    .controller('ProfileController', [
        '$scope',
        'authentication',
        'Notification',
        function($scope, authentication, Notification){
            $scope.changePassword = function(changedPassword){
                console.log('Changed password to ' + changedPassword);
                authentication.changePassword(changedPassword)
                    .then(function(){
                        Notification.success('Password changed succesfully!');
                    });
            }
        }
    ])