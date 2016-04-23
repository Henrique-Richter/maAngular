'use strict';

angular.module('myApp.editoraController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/editora', {
    templateUrl: 'editora/editora.html',
    controller: 'EditoraCtrl'
  });
}])

.controller('EditoraCtrl', function($scope, $http) {



  this.editora = {
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: ''
  };

  this.salvar = function() {
    $http.post('http://localhost:8000/api/editora',this.editora).success(function(data, status, headers, config) {
      console.log('Success: ', data, status, headers, config)
      $scope.resultado="Cadastrado";
    }).
    error(function(data, status, headers, config) {
      console.log('Error: ', data, status, headers, config)
      $scope.resultado="Erro";
    });
    console.log('User clicked register', this.editora);
    $scope.myForm.$setPristine();
    this.editora = {
      nome: '',
      cnpj: '',
      endereco: '',
      telefone: ''
    };
    $scope.myForm.$setUntouched();

  };

});
