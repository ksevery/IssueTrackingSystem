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
        .when('/issues/:id/edit', {
            controller: 'EditIssueController',
            templateUrl: 'app/issues/edit-issue.html',
            resolve: {
                access: ['$location', '$route', 'identity', 'Notification', 'issues', function ($location, $route, identity, Notification, issues) {
                        if (!identity.isAuthenticated()) {
                            Notification.error('Only logged in users allowed!');
                            $location.path('/');
                        }
                        
                        issues.getIssueById($route.current.params.id)
                            .then(function(issue){
                                var currentUser = identity.getCurrentUser();
                                if(issue.Assignee.Id !== currentUser.Id || issue.Author.Id !== currentUser.Id){
                                    Notification.error('Only project lead or issue assignee allowed!');
                                    $location.path('/');
                                }
                            });
                    }]
            }
        });
    }])
    .controller('IssueController', [
        '$scope',
        '$routeParams',
        'issues',
        'identity',
        function($scope, $routeParams, issues, identity){
            $scope.isAssignee = false;
            $scope.isProjectLeader = false;
            issues.getIssueById($routeParams.id)
                .then(function(issue){
                    $scope.issue = issue;
                    var currentUser = identity.getCurrentUser();
                    if(issue.Assignee.Id === currentUser.Id){
                        $scope.isAssignee = true;
                    }
                    
                    if(issue.Author.Id === currentUser.Id){
                        $scope.isProjectLeader = true;
                    }
                });
        }
    ])
    .controller('EditIssueController', [
        '$scope',
        '$routeParams',
        '$window',
        '$location',
        'Notification',
        'identity',
        'issues',
        'users',
        'labels',
        'projects',
        function($scope, $routeParams, $window, $location, Notification, identity, issues, users, labels, projects){
            $scope.isProjectLeader = false;
            $scope.selectedLabels = [];
            $scope.datePopup = {
                isOpen: false
            };
            // Some of the edited values are stored here, needs to be an object for binding to work.
            $scope.newValues = {
                dueDate: null,
                title: null,
                description: null
            };
            
            issues.getIssueById($routeParams.id)
                .then(function(issue){
                    $scope.issue = issue;
                    projects.getProject($scope.issue.Project.Id)
                        .then(function(project){
                            $scope.priorities = project.Priorities;
                        });
                    var currentUser = identity.getCurrentUser();
                    if(issue.Author.Id === currentUser.Id){
                        $scope.isProjectLeader = true;
                    }
                    
                    $scope.selectedUser = issue.Assignee;
                    $scope.newValues.dueDate = new Date(issue.DueDate);
                    $scope.selectedLabels = issue.Labels;
                    $scope.newValues.title = issue.Title;
                    $scope.newValues.description = issue.Description;
                });
                
            $scope.searchUsers = function (searchUser) {
                return users.getUsersByQuery('Username.Contains("' + searchUser + '")');
            }
            
            $scope.searchLabels = function(searchLabel){
                return labels.getLabelsByName(searchLabel);
            };
            
            $scope.openPopup = function(){
                $scope.datePopup.isOpen = true;
            };
            
            $scope.transformChip = function (chip) {
                // If it is an object, it's already a known chip
                if (angular.isObject(chip)) {
                    return chip;
                }
                // Otherwise, create a new one
                return { Name: chip }
            };
            
            $scope.editIssue = function(){
                var issue = $scope.issue;
                var editedIssue = {
                    Title: $scope.newValues.title || issue.Title,
                    Description: $scope.newValues.description || issue.Description,
                    DueDate: $scope.newValues.dueDate || issue.DueDate,
                    ProjectId: issue.Project.Id,
                    PriorityId: issue.Priority.Id,
                    AssigneeId: issue.Assignee.Id
                };
                
                if($scope.selectedLabels.length > 0){
                       editedIssue.Labels = $scope.selectedLabels.map(function(item){
                           return { Name: item.Name };
                       });
                }
                
                if($scope.selectedUser){
                    editedIssue.AssigneeId = $scope.selectedUser.Id;
                }
                
                issues.updateIssue($routeParams.id, editedIssue)
                    .then(function(data){
                        Notification.success('Edited issue successfuly!');
                        $location.path('/issues/' + $routeParams.id);
                    });
            };
            
            $scope.cancel = function(){
                $window.history.back();
            };
        }
    ]);