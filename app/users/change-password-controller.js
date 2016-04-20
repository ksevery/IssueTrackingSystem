angular.module('issueTrackingSystem.users.changePassword', [])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/profile/password', {
                controller: 'ProfileController',
                templateUrl: 'app/users/change-password.html'
            })
        }])
    .controller('ProfileController', [
        '$scope',
        'authentication',
        function($scope, authentication){
            $scope.changePassword = function(changedPassword){
                console.log('Changed password to ' + changedPassword);
                authentication.changePassword(changedPassword)
                    .then(function(){
                        
                    });
            }
        }
    ])