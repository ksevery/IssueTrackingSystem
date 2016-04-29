angular.module('issueTrackingSystem.projects.projectsService', [])
    .factory('projects', [
        '$http',
        '$q',
        'BASE_URL',
        'PROJECTS_MAX_COUNT',
        'BASE_PAGE_SIZE',
        'identity',
        function ($http, $q, BASE_URL, PROJECTS_MAX_COUNT, BASE_PAGE_SIZE, identity) {
            function getProject(projectId) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + projectId, identity.getAuthorizationHeaders())
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function(response){
                        deferred.reject(response);
                    });

                return deferred.promise;
            }
            
            function getProjectIssues(projectId) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + projectId + '/issues', identity.getAuthorizationHeaders())
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function(response){
                        deferred.reject(response);
                    });

                return deferred.promise;
            }
            
            function createNewProject(newProject) {
                var deferred = $q.defer();
                
                $http.post(BASE_URL + 'projects', newProject, identity.getAuthorizationHeaders())
                    .then(function(response){
                        deferred.resolve(response.data);
                    }, function(error){
                        deferred.reject(error);
                    });
                
                return deferred.promise;
            }
            
            function getAllProjectsForUser(userId, pageSize, pageNumber) {
                pageSize = pageSize || PROJECTS_MAX_COUNT;
                pageNumber = pageNumber || 1;
                var deferred = $q.defer();
                $http.get(BASE_URL + 'projects?filter=Issues.Any(Assignee.Id=="' + userId + '")||LeadId=="' + userId + '"&pageSize=' + pageSize + '&pageNumber=' + pageNumber, identity.getAuthorizationHeaders())
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function(error){
                        deferred.reject(error);
                    });
                
                return deferred.promise;
            }
            
            function getAllProjects(pageSize, pageNumber) {
                pageSize = pageSize || BASE_PAGE_SIZE;
                pageNumber = pageNumber || 1;
                var deferred = $q.defer();
                $http.get(BASE_URL + 'projects?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&filter=', identity.getAuthorizationHeaders())
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function(error){
                        deferred.reject(error);
                    });
                
                return deferred.promise;
            }

            return {
                getProject: getProject,
                getProjectIssues: getProjectIssues,
                createNewProject: createNewProject,
                getAllProjectsForUser: getAllProjectsForUser,
                getAllProjects: getAllProjects
            }
        }
    ])