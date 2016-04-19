'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
  'ngRoute',
  'ngCookies',
  'issueTrackingSystem.home',
  'issueTrackingSystem.common.main',
  'issueTrackingSystem.users.authentication',
  'issueTrackingSystem.users.identity'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}])
.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
