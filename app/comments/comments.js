angular.module('issueTrackingSystem.comments.commentService', [])
    .factory('comments', [
        '$http',
        '$q',
        'BASE_URL',
        'identity',
        function($http, $q, BASE_URL, identity){
            function getCommentsByIssueId(issueId) {
                var deferred = $q.defer();
                
                var url = BASE_URL + 'issues/' + issueId + '/comments';
                $http.get(url, identity.getAuthorizationHeaders())
                    .then(function(response){
                        deferred.resolve(response.data);
                    });
                
                return deferred.promise;
            }
            
            function addCommentToIssue(issueId, comment) {
                var deferred = $q.defer();
                
                var url = BASE_URL + 'issues/' + issueId + '/comments';
                $http.post(url, comment, identity.getAuthorizationHeaders())
                    .then(function(response){
                        deferred.resolve(response.data);
                    });
                
                return deferred.promise;
            }
            
            return {
                getCommentsByIssueId: getCommentsByIssueId,
                addCommentToIssue: addCommentToIssue
            }
        }
    ])