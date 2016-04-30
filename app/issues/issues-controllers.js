angular.module('issueTrackingSystem.issues', [])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/issues/:id', {
            controller: 'IssueController',
            templateUrl: 'app/issues/single-issue.html',
            resolve: {
                access: ['$location', 'identity', 'Notification', function ($location, identity, Notification) {
                        if (!identity.isAuthenticated()) {
                            Notification.error('Only logged in users allowed!');
                            $location.path('/');
                        }
                    }]
            }
        })
    }])
    .controller('IssueController', [
        '$scope',
        '$routeParams',
        'issues',
        function($scope, $routeParams, issues){
            issues.getIssueById($routeParams.id)
                .then(function(issue){
                    $scope.issue = issue;
                });
        }
    ]);