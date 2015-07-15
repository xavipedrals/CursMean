'use strict';

angular.module('yoRasoApp')
  .controller('AgendaCtrl', function ($scope, AgendaService, contactService, $route, $location, AuthService) {
    $scope.createAgendaData = {};
    $scope.agendesData = {};

    $scope.user = AuthService.getUser();

    if($scope.user.token === undefined) $location.url('/login');
    else {

      AgendaService.getAgendes().then(function (data) {
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

      $scope.selectAgenda = function (agenda) {
        var agendaName = agenda.name;
        console.log(agendaName);
        contactService.setAgenda(agendaName);
        $location.url('/contactes');
      };
    }
});
