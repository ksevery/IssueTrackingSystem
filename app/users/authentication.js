angular.module('issueTrackingSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        'projectSessionStorage',
        'identity',
        function ($http, $q, BASE_URL, projectSessionStorage, identity) {
            function registerUser(userRegisterData) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', userRegisterData)
                    .then(function (response) {
                        deferred.resolve(response.data)
                    });

                return deferred.promise;
            }

            function loginUser(userLoginData) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Token', userLoginData)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    })
                    .then(function(){
                        getUser()
                            .then(function(user){
                                projectSessionStorage.addOrUpdate('current-user', JSON.stringify(user));                               
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
                projectSessionStorage.deleteItem('access-token');
                projectSessionStorage.deleteItem('currentUser');            
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout,
                changePassword: changePassword
            }
        }
    ])