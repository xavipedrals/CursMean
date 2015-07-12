'use strict';

angular.module('yoRasoApp')
  .controller('AgendaCtrl', function ($scope, AgendaService, $route) {
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

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
});
