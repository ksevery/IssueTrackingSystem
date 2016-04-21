angular.module('issueTrackingSystem.common.main', [])
    .controller('MainController', [
        '$scope',
        'identity',
        'authentication',
        function($scope, identity, authentication){
            $scope.isAuthenticated = function () {
                return identity.isAuthenticated();
            };
            
            $scope.isAdmin = function(){
                if(identity.isAuthenticated()){
                    return identity.getCurrentUser().isAdmin
                }
                
                return false;
            }
            
            $scope.logout = function(){
                authentication.logout();
            };
    }])