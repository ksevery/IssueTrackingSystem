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
                    var currentUser = identity.getCurrentUser();
                    if(currentUser){
                        return currentUser.isAdmin;
                    }
                }
                
                return false;
            };
            
            $scope.user = identity.getCurrentUser();
            
            $scope.logout = function(){
                authentication.logout();
            };
    }])