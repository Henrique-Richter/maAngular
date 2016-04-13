'use strict';

angular.module('myApp.editora', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/editora', {
    templateUrl: 'editora/editora.html',
    controller: 'EditoraCtrl'
  });
}])

.controller('EditoraCtrl', function($scope, $http) {

  /*$scope.$watch('inputVal', function(te) {
        if (te) {
            console.log(te);
            $http.post('http://localhost:8000/api/editora', {
            nome: "testano",
            telefone: "12345678912",
            endereco: "jaguariuna",
            cnpj: "08.580.281/0001-00"
        });
        }
    });

    $scope.salvar = function() {
      $http.post('http://localhost:8000/api/editora', {
        nome: nome,
        telefone: "12345678912",
        endereco: "jaguariuna",
        cnpj: "08.580.281/0001-00"
    });
  }
  */


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
