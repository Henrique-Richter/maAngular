'use strict';

angular.module('myApp.indexController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/carrinho', {
    templateUrl: 'carrinho/visualizarCarrinho.html',
    controller: 'indexCtrl'
  });
}])

.controller('indexCtrl', function($scope, $http,$timeout,$location) {



  this.produto={
    id: "" ,
    quantidade: "",
    titulo: "",
    preco: ""
  };

  this.carrinho =[];

    this.adicionarCarrinho= function(id,quantidade,titulo,preco){
    //  console.log(id,quantidade,titulo,preco);

      this.produto.id=id;
      this.produto.quantidade=quantidade;
      this.produto.titulo=titulo;
      this.produto.preco=preco;
      var copia=angular.copy(this.produto);

      var found = false;
      for(var i = 0; i < this.carrinho.length; i++) {
          if (this.carrinho[i].id == copia.id) {
              found = true;
              break;
          }
      }

      if(found==false){
        this.carrinho.push(copia);
       alert("Adicionado no carrinho");
     }else{
       alert("Já existe no carrinho");
     }

    };

  //$scope.counter = 100;

  this.resetar = function(){
    this.pesquisa={
      titulo:null,
      editora:null,
      categoria:null,
      autor:null
    }
  };
  this.pesquisa={
    titulo:null,
    editora:null,
    categoria:null,
    autor:null
  }






    $scope.countdown = function() {
      var   timerCount = 1200;

      var countDown = function () {
      if (timerCount < 0) {
        //Any desired function upon countdown end.
        //$window.close();
        console.log("Terminou");
      } else {
        var minutes = Math.floor(timerCount / 60);
        var seconds = timerCount - minutes * 60;

        $scope.counter = " " + minutes + " : "+ seconds;
        timerCount--;
        $timeout(countDown, 1000);
      }
    };
    var minutes = Math.floor(timerCount / 60);
    var seconds = timerCount - minutes * 60;

    $scope.counter = " " + minutes + " : "+ seconds;

    countDown();

  };

  this.resetTime = function(){
    console.log("teste ok");
    timerCount= 1200;
  };

  this.pesquisar= function(){
    console.log(this.pesquisa);
    $location.path("listarLivro");
    $http.get('http://localhost:8000/api/livro/'+this.pesquisa.titulo+"/"+this.pesquisa.editora+"/"+this.pesquisa.categoria+"/"+this.pesquisa.autor).success(function(data, status, headers, config){
      $scope.livros= data;
      console.log(data, status, headers, config);
    });
    console.log("teste redirecionar");
    this.resetar();
  };

});
