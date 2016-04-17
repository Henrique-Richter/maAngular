'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  //'ngRoute',
  'ui.router',
  'myApp.editoraController',
  'myApp.version',
  'myApp.autorController',
  'myApp.livroController'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/version'});
}]);
