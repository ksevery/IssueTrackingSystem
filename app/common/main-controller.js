angular.module('issueTrackingSystem.common.main', [])
    .controller('MainController', [
        '$scope',
        'identity',
        'authentication',
        function($scope, identity, authentication){
            $scope.isAuthenticated = function () {
                return identity.isAuthenticated(sessionStorage);
            };
            
            $scope.logout = function(){
                authentication.logout(sessionStorage);
            };
    }])