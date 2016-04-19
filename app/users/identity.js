angular.module('issueTrackingSystem.users.identity', [])
    .factory('identity', [
        function () {
            function isAuthenticated(sessionStorage) {
                if(sessionStorage['access-token']){
                    return true;
                }
                
                return false;
            }
            
            return {
                isAuthenticated: isAuthenticated
            }
        }])