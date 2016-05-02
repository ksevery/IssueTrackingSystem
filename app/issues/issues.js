angular.module('issueTrackingSystem.issuesService', [])
    .factory('issues', [
        '$http',
        '$q',
        'BASE_URL',
        'BASE_PAGE_SIZE',
        'identity',
        function($http, $q, BASE_URL, BASE_PAGE_SIZE, identity){
            function getCurrentUserIssues(pageSize, pageNumber, orderBy){
                pageSize = parseInt(pageSize || BASE_PAGE_SIZE);
                pageNumber = parseInt(pageNumber || 1);
                orderBy = orderBy || 'DueDate desc';
                
                var url = BASE_URL + 'Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderBy;
                
                var deferred = $q.defer();
                
                $http.get(url, identity.getAuthorizationHeaders())
                    .then(function(response){
                        deferred.resolve(response.data);
                    })
                
                return deferred.promise;
            }
            
            function addIssue(issue) {
                var deferred = $q.defer();
                
                var url = BASE_URL + 'issues';
                
                $http.post(url, issue, identity.getAuthorizationHeaders())
                    .then(function(response){
                        deferred.resolve(response.data);
                    }, function(error){
                        deferred.reject(error);
                    });
                
                return deferred.promise;
            }
            
            function getIssueById(issueId){
                var deferred = $q.defer();
                
                var url = BASE_URL + 'issues/' + issueId;
                
                $http.get(url, identity.getAuthorizationHeaders())
                    .then(function(response){
                        deferred.resolve(response.data);
                    }, function(error){
                        deferred.reject(error);
                    });
                
                return deferred.promise;
            }
            
            function updateIssue(issueId, issue) {
                var deferred = $q.defer();
                
                var url = BASE_URL + 'issues/' + issueId;
                
                $http.put(url, issue, identity.getAuthorizationHeaders())
                    .then(function(response){
                        deferred.resolve(response.data);
                    }, function(error){
                        deferred.reject(error);
                    });
                
                return deferred.promise;
            }
            
            function updateIssueStatus(issueId, statusId) {
                var deferred = $q.defer();
                
                var url = BASE_URL + 'issues/' + issueId + '/changestatus?statusId=' + statusId;
                
                $http.put(url, null, identity.getAuthorizationHeaders())
                    .then(function(response){
                        deferred.resolve(response.data);
                    }, function(error){
                        deferred.reject(error);
                    });
                
                return deferred.promise;
            }
            
            return {
                getCurrentUserIssues: getCurrentUserIssues,
                addIssue: addIssue,
                getIssueById: getIssueById,
                updateIssue: updateIssue,
                updateIssueStatus: updateIssueStatus
            }
    }])