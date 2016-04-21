angular.module('issueTrackingSystem.projects.projectsService', [])
    .factory('projects', [
        '$http',
        '$q',
        'BASE_URL',
        'identity',
        function ($http, $q, BASE_URL, identity) {
            function getProject(projectId) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + projectId, {
                            headers: {
                                Authorization: 'Bearer ' + identity.getAccessToken()
                            }
                        })
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function(response){
                        deferred.reject(response);
                    });

                return deferred.promise;
            }
            
            function getProjectIssues(projectId) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + projectId + '/issues', {
                            headers: {
                                Authorization: 'Bearer ' + identity.getAccessToken()
                            }
                        })
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function(response){
                        deferred.reject(response);
                    });

                return deferred.promise;
            }

            return {
                getProject: getProject,
                getProjectIssues: getProjectIssues
            }
        }
    ])