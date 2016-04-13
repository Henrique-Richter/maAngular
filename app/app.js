'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  //'ngRoute',
  'ui.router',
  'myApp.editora',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/version'});
}]);
