'use strict';

angular.module('yoRasoApp')
  .controller('AgendaCtrl', function ($scope, AgendaService, contactService, $route, $location) {
    $scope.createAgendaData = {};
    $scope.agendesData = {};

    AgendaService.getAgendes().then(function(data){
      console.log('SUCCES');
      $scope.agendesData = data.data;
    }, function () {
      console.log('FAILED');
    });

    $scope.createAgendaCon = function () {
      AgendaService.createAgenda($scope.createAgendaData.name).then(function () {
        console.log('SUCCES');
        $route.reload();
      }, function () {
        console.log('FAILED');
      });
    };

    $scope.selectAgenda = function (agenda){
      var agendaName = agenda.name;
      console.log(agendaName);
      contactService.setAgenda(agendaName);
      $location.url('/contactes');
    }
});
