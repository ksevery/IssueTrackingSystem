angular.module('issueTrackingSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){
            function registerUser(userRegisterData) {
                var deferred = $q.defer();
                
                $http.post(BASE_URL + 'api/Account/Register', userRegisterData)
                    .then(function(response){
                        deferred.resolve(response.data)
                    });
                
                return deferred.promise;
            }
            
            function loginUser(userLoginData) {
                var deferred = $q.defer();
                
                $http.post(BASE_URL + 'api/Token', userLoginData)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    });
                
                return deferred.promise;
            }
            
            function logout(sessionStorage) {
                delete sessionStorage['access-token'];
            }
            
            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout
            }
        }
    ])