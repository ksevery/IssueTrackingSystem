angular.module('issueTrackingSystem.users.profile', [])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/profile/changePassword', {
                controller: 'ProfileController',
                templateUrl: 'app/users/change-password.html'
            })
        }])
    .controller('ProfileController', [
        '$scope',
        function($scope){
            $scope.changePassword = function(){
                
            }
        }
    ])