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
            
            function getAccessToken() {
                return projectSessionStorage.get('access-token');
            }
            
            return {
                isAuthenticated: isAuthenticated,
                getAccessToken: getAccessToken,
                getCurrentUser: function(){
                    return JSON.parse(projectSessionStorage.get('current-user'));
                }
            }
        }])