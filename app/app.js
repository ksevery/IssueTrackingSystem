'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
  'ngRoute',
  'ngCookies',
  'ui.bootstrap',
  'issueTrackingSystem.home',
  'issueTrackingSystem.common.main',
  'issueTrackingSystem.common.sessionStorage',
  'issueTrackingSystem.users.authentication',
  'issueTrackingSystem.users.identity',
  'issueTrackingSystem.issues'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}])
.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
.constant('BASE_PAGE_SIZE', 10);
