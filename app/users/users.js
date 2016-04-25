angular.module('issueTrackingSystem.users.userService', [])
    .factory('users', [
        '$http',
        '$q',
        'BASE_URL',
        'identity',
        function($http, $q, BASE_URL, identity){
            function getAllUsers() {
                var deferred = $q.defer();
                
                $http.get(BASE_URL + 'Users', {
                        headers: {
                            Authorization: 'Bearer ' + identity.getAccessToken()
                        }
                    })
                    .then(function(response){
                        deferred.resolve(response.data);
                    })
                
                return deferred.promise;
            }
            
            function getUsersByQuery(queryText) {
                var deferred = $q.defer();
                
                $http.get(BASE_URL + 'Users/?filter=' + queryText, {
                        headers: {
                            Authorization: 'Bearer ' + identity.getAccessToken()
                        }
                    })
                    .then(function(response){
                        deferred.resolve(response.data);
                    })
                
                return deferred.promise;
            }
            
            return {
                getAllUsers: getAllUsers,
                getUsersByQuery: getUsersByQuery
            }
        }
    ])