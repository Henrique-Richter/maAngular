'use strict';

angular.module('myApp.indexController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/carrinho', {
		templateUrl: 'carrinho/visualizarCarrinho.html',
		controller: 'indexCtrl'
	});
}])

.controller('indexCtrl', function($scope, $http,$timeout,$location,  $rootScope) {


	this.removerDoCarrinho=function($index){
		this.carrinho.splice($index,1);
	}
	this.atualizarCarrinho=function(value,$index){

		var copia=angular.copy(this.carrinho[$index]);

		copia.quantidade=copia.quantidade + value;
		this.carrinho.splice($index, 1);
		this.carrinho.splice($index, 0, copia);
	}

	$scope.$on('$routeChangeStart', function(next, current) { 
		resetTime();
	});

	this.produto={
		id: null ,
		quantidade: null,
		titulo: null,
		preco: null,
		estoque: null
	};

	this.carrinho =[];
	$scope.cart = this.carrinho;

	this.adicionarCarrinho= function(id,quantidade,titulo,preco,estoque){
		console.log(id,quantidade,titulo,preco,estoque);

		this.produto.id=id;
		this.produto.quantidade=quantidade;
		this.produto.titulo=titulo;
		this.produto.preco=preco;
		this.produto.estoque = estoque;

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


	//metodo para pegar o total

	this.getTotal = function(){
		var total = 0;
		for(var i = 0; i < this.carrinho.length; i++){
			var product = this.carrinho[i];
			total += (product.preco * product.quantidade);
		}
		return total;
	}
	var timerCount = 1200;
	$scope.countdown = function() {

		var countDown = function () {
			if (timerCount < 0) {
	        //Any desired function upon countdown end.
	        //  this.carrinho=[];
	        $scope.cart.length = 0;
	        alert('Carrinho resetado!');
	        $location.path("index");
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


	var resetTime = function(){
		console.log("teste ok");
		timerCount= 1200;
	};

	this.pesquisar= function(){
		console.log(this.pesquisa);
		$location.path("listarLivro");
		$http.post('http://localhost:8000/api/livro/busca',this.pesquisa).success(function(data, status, headers, config){
			$scope.livros= data;
			console.log(data, status, headers, config);
		});
	  //  console.log("teste redirecionar");
	  this.resetar();
};

});
