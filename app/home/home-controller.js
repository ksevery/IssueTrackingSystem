/// <reference path="../../typings/tsd.d.ts" />

angular.module('issueTrackingSystem.home', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'HomeController',
            templateUrl: 'app/home/home.html'
        });
    }])
    .controller('HomeController', [
        '$scope',
        'identity',
        'authentication',
        function ($scope, identity, authentication) {
            $scope.isLogged = function () {
                return identity.isAuthenticated(sessionStorage);
            };

            $scope.loginUser = function (user) {
                var loginUser = 'grant_type=password&Username=' + user.Username + '&Password=' + user.Password;

                authentication.loginUser(loginUser)
                    .then(function(data){
                        sessionStorage['access-token'] = data.access_token;
                    });
            };
            
            $scope.register = function(registerUser){
                authentication.registerUser(registerUser)
                    .then(function(){
                        var loginUser = {
                            Username: registerUser.Email,
                            Password: registerUser.Password
                        };
                        
                        $scope.loginUser(loginUser);
                    });
            };
        }])