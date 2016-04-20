angular.module('issueTrackingSystem.home', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'HomeController',
            templateUrl: 'app/home/home.html'
        });
    }])
    .controller('HomeController', [
        '$scope',
        'identity',
        'authentication',
        'issues',
        'projectSessionStorage',
        function ($scope, identity, authentication, issues, projectSessionStorage) {
            $scope.loginUser = function (user) {
                var loginUser = 'grant_type=password&Username=' + user.Username + '&Password=' + user.Password;

                authentication.loginUser(loginUser)
                    .then(function (data) {
                        projectSessionStorage.addOrUpdate('access-token', data.access_token);
                    });
            };

            $scope.register = function (registerUser) {
                authentication.registerUser(registerUser)
                    .then(function () {
                        var loginUser = {
                            Username: registerUser.Email,
                            Password: registerUser.Password
                        };

                        $scope.loginUser(loginUser);
                    });
            };
            
            $scope.pageChanged = function() {
                console.log($scope.pagination);
                issues.getCurrentUserIssues(null, $scope.pagination.currentPage)
                    .then(function (data) {
                        $scope.userIssues = data.Issues;
                        var projects = {};
                        for(var issue in data.Issues){
                            var projectId = data.Issues[issue].Project.Id;
                            projects[projectId] = data.Issues[issue].Project;
                        }
                        
                        $scope.projects = projects;
                    });
            };

            if ($scope.isAuthenticated()) {
                issues.getCurrentUserIssues()
                    .then(function (data) {
                        $scope.userIssues = data.Issues;
                        $scope.totalItems = data.Issues.length * data.TotalPages;
                        $scope.maxSize = data.Issues.length;
                        $scope.pagination = {
                            currentPage: 1
                        };
                        
                        var projects = {};
                        for(var issue in data.Issues){
                            var projectId = data.Issues[issue].Project.Id;
                            projects[projectId] = data.Issues[issue].Project;
                        }
                        
                        $scope.projects = projects;
                    });
            }
        }])