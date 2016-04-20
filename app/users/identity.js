angular.module('issueTrackingSystem.users.identity', [])
    .factory('identity', [
        'projectSessionStorage',
        function (projectSessionStorage) {
            function isAuthenticated() {
                if(projectSessionStorage.get('access-token')){
                    return true;
                }
                
                return false;
            }
            
            return {
                isAuthenticated: isAuthenticated
            }
        }])