'use strict';

angular.module('yoRasoApp').factory('AgendaService', AgendaService);

function AgendaService($http, $q) {

  var SERVER_URL = 'http://localhost:8080/agenda/';
  var agenda = {};

  function createAgenda(name) {
    var q = $q.defer();
    $http.post(SERVER_URL, {name: name}).then(function (data) {
      agenda = data.data;
      console.log(data);
      q.resolve(data);
    }, function () {
      console.log('FAILED');
      q.reject();
    });
    return q.promise;
  }

  function getAgendes(){
    var q = $q.defer();
    $http.get(SERVER_URL).then(function(data) {
      console.log(data);
      q.resolve(data);
    }, function (){
      console.log('FAILED');
      q.reject();
    });
    return q.promise;
  }

  function deleteAgenda(name){
    var q = $q.defer();
    console.log(name);
    $http.put(SERVER_URL, {name: name}).then(function (data) {
      console.log(data);
      q.resolve(data);
    }, function (){
      console.log('FAIL');
      q.reject();
    });
    return q.promise;
  }

  return{
    createAgenda:createAgenda,
    getAgendes: getAgendes,
    deleteAgenda: deleteAgenda
  };
}
