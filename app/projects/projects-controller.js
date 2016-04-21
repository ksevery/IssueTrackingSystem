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
                showModal: ['$uibModal', '$location', function ($uibModal, $location) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'app/projects/project-add-modal.html',
                        controller: 'ProjectAddModalController'
                    });

                    modalInstance.result
                        .then(function (newProject) {
                            console.log(newProject);
                        }, function(){
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
        function ($scope, $uibModalInstance, users) {
            users.getAllUsers()
                .then(function(users){
                    $scope.users = users;
                });
            
            $scope.ok = function () {
                $uibModalInstance.close($scope.newProject);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }
        }
    ])