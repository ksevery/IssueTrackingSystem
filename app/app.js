'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
  'ngRoute',
  'ngCookies',
  'ngMaterial',
  'ui.bootstrap',
  'ui-notification',
  'issueTrackingSystem.home',
  'issueTrackingSystem.common.main',
  'issueTrackingSystem.common.localStorage',
  'issueTrackingSystem.users.authentication',
  'issueTrackingSystem.users.identity',
  'issueTrackingSystem.users.userService',
  'issueTrackingSystem.users.changePassword',
  'issueTrackingSystem.users.logout',
  'issueTrackingSystem.issuesService',
  'issueTrackingSystem.projects',
  'issueTrackingSystem.projects.projectsService',
  'issueTrackingSystem.labels.service'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}])
.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
.constant('BASE_PAGE_SIZE', 10)
.constant('EMAIL_VALIDATOR', /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)
.constant('PROJECTS_MAX_COUNT', 100);
