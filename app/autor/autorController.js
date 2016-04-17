'use strict';

angular.module('myApp.autorController', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/autor', {
    templateUrl: 'autor/autor.html',
    controller: 'autorCtrl'
  });
}])

.controller('autorCtrl', function($scope, $http) {

  /* não da para usar por retornar data mesmo quando com sucesso
  var erros='';
  angular.forEach(data, function(value, key) {
  erros = erros +", "+ value +" " ;
  $scope.resultado=erros;
})*/
this.resetar = function(){
  this.autor = {
    nome: '',
    biografia: '',
    dtNasc: '',
    localNasc: '',
    localFal: null,
    dtFal: null
  };
};

this.autor = {
  nome: '',
  biografia: '',
  dtNasc: '',
  localNasc: '',
  localFal: null,
  dtFal: null
};

this.salvar = function() {
  var d = this.autor.dtNasc;
  this.autor.dtNasc = d.getFullYear() + "-" + d.getMonth() +"-"+ d.getDate();
  var df = this.autor.dtFal;
  if(df != null){
    this.autor.dtFal = df.getFullYear() + "-" + df.getMonth() +"-"+ df.getDate();
  }
  $http.post('http://localhost:8000/api/autor',JSON.stringify(this.autor)).success(function(data, status, headers, config) {
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

});
