angular.module('issueTrackingSystem.users.identity', [])
    .factory('identity', [
        'projectLocalStorage',
        function (projectLocalStorage) {
            function isAuthenticated() {
                if(projectLocalStorage.get('access-token')){
                    return true;
                }
                
                return false;
            }
            
            function getAccessToken() {
                return projectLocalStorage.get('access-token');
            }
            
            function getAuthorizationHeaders(){
                return {
                    headers: {
                        Authorization: 'Bearer ' + getAccessToken()
                    }
                }
            }
            
            return {
                isAuthenticated: isAuthenticated,
                getAccessToken: getAccessToken,
                getAuthorizationHeaders: getAuthorizationHeaders,
                getCurrentUser: function(){
                    var currentUser = projectLocalStorage.get('current-user');
                    if(currentUser){
                        return JSON.parse(currentUser);
                    }
                    
                    return currentUser;
                }
            }
        }])