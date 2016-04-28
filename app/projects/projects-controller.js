angular.module('issueTrackingSystem.projects', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/add', {
            resolve: {
                access: ['$location', 'identity', 'Notification', function ($location, identity, Notification) {
                    if (!identity.isAuthenticated() || !identity.getCurrentUser().isAdmin) {
                        Notification.error('Only logged in users allowed!');
                        $location.path('/');
                    }
                }],
                showModal: ['$uibModal', '$location', 'Notification', 'projects', function ($uibModal, $location, Notification, projects) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'app/projects/project-add-modal.html',
                        controller: 'ProjectAddModalController'
                    });

                    modalInstance.result
                        .then(function (newProject) {
                            projects.createNewProject(newProject)
                                .then(function(data){
                                    Notification.success('Project ' + newProject.Name + ' created!');
                                    $location.path('/projects/' + data.Id);
                                }, function(error){
                                    console.log(error);
                                });
                        }, function () {
                            $location.path('/');
                        })
                }]
            }
        })
            .when('/projects/:id', {
                controller: 'projectController',
                templateUrl: 'app/projects/single-project.html',
                resolve: {
                    access: ['$location', 'identity', 'Notification', function ($location, identity, Notification) {
                        if (!identity.isAuthenticated()) {
                            Notification.error('Only logged in users allowed!');
                            $location.path('/');
                        }
                    }]
                }
            });
    }])
    .controller('projectController', [
        '$scope',
        '$routeParams',
        'projects',
        'identity',
        function ($scope, $routeParams, projects, identity) {
            projects.getProject($routeParams.id)
                .then(function (data) {
                    $scope.project = data;
                    console.log(data);
                    $scope.isProjectLead = checkProjectLead();
                    console.log(identity.getCurrentUser());
                });

            projects.getProjectIssues($routeParams.id)
                .then(function (data) {
                    console.log(data);
                    $scope.projectIssues = data;
                });

            function checkProjectLead() {
                if (!$scope.project || !identity.getCurrentUser()) {
                    return false;
                }

                return $scope.project.Lead.Id === identity.getCurrentUser().Id;
            }
        }
    ])
    .controller('ProjectAddModalController', [
        '$scope',
        '$uibModalInstance',
        'users',
        'labels',
        'EMAIL_VALIDATOR',
        function ($scope, $uibModalInstance, users, labels, EMAIL_VALIDATOR) {
            $scope.selectedLabels = [];
            $scope.selectedPriorities = [];
            
            $scope.ok = function () {
                $scope.newProject.LeadId = $scope.selectedUser.Id;
                var name = $scope.newProject.Name;
                var letters = name.match(/\b(\w)/g);
                var projectKey = letters.join('');
                $scope.newProject.ProjectKey = projectKey;
                if($scope.selectedLabels.length > 0){
                       $scope.newProject.Labels = $scope.selectedLabels.map(function(item){
                           return { Name: item.Name };
                       });
                }
                
                
                
                $scope.newProject.Priorities = $scope.selectedPriorities;
                
                $uibModalInstance.close($scope.newProject);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

            $scope.searchUsers = function (searchUser) {
                return users.getUsersByQuery('Username.Contains("' + searchUser + '")');
            }

            $scope.transformChip = function (chip) {
                // If it is an object, it's already a known chip
                if (angular.isObject(chip)) {
                    return chip;
                }
                // Otherwise, create a new one
                return { Name: chip }
            }
            
            $scope.searchLabels = function(searchLabel){
                return labels.getLabelsByName(searchLabel);
            }
            
            $scope.validateMdElements = function(){
                var priorities = $scope.selectedPriorities;
                var user = $scope.selectedUser;
                
                if(priorities.length <= 0){
                    return false;
                }
                
                if(!user || !user.Username.match(EMAIL_VALIDATOR)){
                    return false;
                }
                
                
                return true;
            }
        }
    ])