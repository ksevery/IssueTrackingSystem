'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
  'ngRoute',
  'ngCookies',
  'ngMaterial',
  'ngMessages',
  'ui.bootstrap',
  'ui-notification',
  'issueTrackingSystem.home',
  'issueTrackingSystem.comments.commentService',
  'issueTrackingSystem.common.main',
  'issueTrackingSystem.common.localStorage',
  'issueTrackingSystem.common.directives',
  'issueTrackingSystem.users.authentication',
  'issueTrackingSystem.users.identity',
  'issueTrackingSystem.users.userService',
  'issueTrackingSystem.users.changePassword',
  'issueTrackingSystem.users.logout',
  'issueTrackingSystem.issuesService',
  'issueTrackingSystem.issues',
  'issueTrackingSystem.projects',
  'issueTrackingSystem.projects.projectsService',
  'issueTrackingSystem.labels.service'
]).
config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  
  $httpProvider.interceptors.push(['$q', function($q){
    return {
      responseError: function(rejection){
        return $q.reject(rejection.data);
      }
    }
  }])
}])
.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
.constant('BASE_PAGE_SIZE', 10)
.constant('EMAIL_VALIDATOR', /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)
.constant('PROJECTS_MAX_COUNT', 100);
