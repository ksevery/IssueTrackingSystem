angular.module('issueTrackingSystem.issuesService', [])
    .factory('issues', [
        '$http',
        '$q',
        'BASE_URL',
        'BASE_PAGE_SIZE',
        'projectSessionStorage',
        function($http, $q, BASE_URL, BASE_PAGE_SIZE, projectSessionStorage){
            function getCurrentUserIssues(pageSize, pageNumber, orderBy){
                pageSize = parseInt(pageSize || BASE_PAGE_SIZE);
                pageNumber = parseInt(pageNumber || 1);
                orderBy = orderBy || 'DueDate desc';
                
                var url = BASE_URL + 'Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderBy;
                
                var deferred = $q.defer();
                
                $http.get(url, {
                        headers: {
                            Authorization: 'Bearer ' + projectSessionStorage.get('access-token')
                        }
                    })
                    .then(function(response){
                        deferred.resolve(response.data);
                    })
                
                return deferred.promise;
            }
            
            function getIssues(pageSize, pageNumber, filter) {
                
            }
            
            return {
                getCurrentUserIssues: getCurrentUserIssues,
                getIssues: getIssues
            }
    }])