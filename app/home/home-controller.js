angular.module('issueTrackingSystem.home', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'HomeController',
            templateUrl: 'app/home/home.html'
        });
    }])
    .controller('HomeController', [
        '$scope',
        'Notification',
        'identity',
        'authentication',
        'issues',
        'projects',
        function ($scope, Notification, identity, authentication, issues, projects) {
            $scope.loginUser = function (user) {
                var loginUser = 'grant_type=password&Username=' + user.Username + '&Password=' + user.Password;

                authentication.loginUser(loginUser)
                    .then(function (data) {
                        Notification.success('Logged in successfuly!');
                        initProjectsAndIssues();
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
                    }, function(error){
                        console.log(error);
                        Notification.error(error);
                    });
            };
            
            $scope.pageChanged = function() {
                issues.getCurrentUserIssues(null, $scope.pagination.currentPage)
                    .then(function (data) {
                        $scope.userIssues = data.Issues;
                    });
            };

            if($scope.isAuthenticated()){
                initProjectsAndIssues();
            }

            function initProjectsAndIssues(){
                issues.getCurrentUserIssues()
                    .then(function (data) {
                        $scope.userIssues = data.Issues;
                        $scope.totalItems = data.Issues.length * data.TotalPages;
                        $scope.maxSize = data.Issues.length;
                        $scope.pagination = {
                            currentPage: 1
                        };
                    });
                    
                projects.getAllProjectsForUser(identity.getCurrentUser().Id)
                            .then(function(projects){
                                $scope.projects = projects.Projects;
                            });
            }
        }])