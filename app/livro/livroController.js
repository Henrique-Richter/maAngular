'use strict';

angular.module('myApp.livroController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/livro', {
    templateUrl: 'livro/livro.html',
    controller: 'livroCtrl'
  }).when('/listarLivro', {
    templateUrl: 'livro/listar.html',
    controller: 'livroCtrl'
  }).when('/visualizarLivro/:id', {
    templateUrl: 'livro/visualizarLivro.html',
    controller: 'livroCtrl'
  });
}])

.controller('livroCtrl', function($scope, $http,$routeParams) {
  var today=new Date();
  $scope.today = today.toISOString();



  this.resetar =function(){
    this.livro={
      autores: [],
      categorias: [],
      editora_id : '',
      titulo: '',
      precovenda: '',
      precocusto: '',
      estoque: '',
      resumo: '',
      indice: '',
      isbn: '',
      dtPublicacao:''


    }
  };

  this.livro={
    autores: [],
    categorias: [],
    editora_id : '',
    titulo: '',
    precovenda: '',
    precocusto: '',
    estoque: '',
    resumo: '',
    indice: '',
    isbn: '',
    dtPublicacao:''

  };

  this.salvar = function() {
    var d = this.livro.dtPublicacao;
    this.livro.dtPublicacao = d.getFullYear() + "-" + d.getMonth() +"-"+ d.getDate();
    $http.post('http://localhost:8000/api/livro',JSON.stringify(this.livro)).success(function(data, status, headers, config) {
      console.log('Success: ', data, status, headers, config)
      $scope.resultado="Cadastrado";
    }).
    error(function(data, status, headers, config) {
      console.log('Error: ', data, status, headers, config)
      $scope.resultado="Erro";
    });
    $scope.myForm.$setPristine();
    this.resetar();
    $scope.myForm.$setUntouched();

  };


  this.getValores = function (){
    getAutores($scope, $http);
    getEditora($scope, $http);
    getCategorias($scope, $http);
  };

  function getAutores($scope, $http){
    $http.get('http://localhost:8000/api/autor').success(function(data){
      $scope.autores= data;
    });
  };
  function getEditora($scope, $http){
    $http.get('http://localhost:8000/api/editora').success(function(data){
      $scope.editora= data;
    });
  };
  function getCategorias($scope, $http){
    $http.get('http://localhost:8000/api/categoria').success(function(data){
      $scope.categorias= data;
    });
  };

   this.getLivros = function(){
      $http.get('http://localhost:8000/api/livro/'+$routeParams.id).success(function(data){
        console.log(data);
        $scope.livroID= data;
      });
   };

});
