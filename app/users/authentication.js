angular.module('issueTrackingSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        'projectLocalStorage',
        'identity',
        function ($http, $q, BASE_URL, projectLocalStorage, identity) {
            function registerUser(userRegisterData) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', userRegisterData)
                    .then(function (response) {
                        deferred.resolve(response.data)
                    }, function(error){
                        deferred.reject(error.data);
                    });

                return deferred.promise;
            }

            function loginUser(userLoginData) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Token', userLoginData)
                    .then(function (response) {
                        projectLocalStorage.addOrUpdate('access-token', response.data.access_token);
                        getUser()
                            .then(function(user){
                                projectLocalStorage.addOrUpdate('current-user', JSON.stringify(user));  
                                deferred.resolve(response.data);                            
                            })
                    });

                return deferred.promise;
            }

            function getUser() {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'Users/me', {
                        headers: {
                            Authorization: 'Bearer ' + identity.getAccessToken()
                        }
                    })
                    .then(function(response){
                        deferred.resolve(response.data);
                    })

                return deferred.promise;
            }

            function changePassword(changedPassword) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/ChangePassword', changedPassword, {
                        headers: {
                            Authorization: 'Bearer ' + identity.getAccessToken()
                        }
                    })
                    .then(function (response) {
                        deferred.resolve(response);
                    });

                return deferred.promise;
            }

            function logout() {
                projectLocalStorage.deleteItem('access-token');
                projectLocalStorage.deleteItem('current-user');            
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout,
                changePassword: changePassword
            }
        }
    ])