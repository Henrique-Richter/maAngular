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
    $http.post('http://localhost:8000/api/editora',JSON.stringify(this.editora));
         console.log('User clicked register', this.editora);
         $scope.myForm.$setPristine();
         this.editora = {
                   nome: '',
                   cnpj: '',
                   endereco: '',
                   telefone: ''
              };
              $scope.myForm.$setUntouched();
              $scope.resultado="Cadastrado";
      };

});
