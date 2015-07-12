'use strict';

/**
 * @ngdoc function
 * @name yoRasoApp.controller:ContactesCtrl
 * @description
 * # ContactesCtrl
 * Controller of the yoRasoApp
 */
angular.module('yoRasoApp')
  .controller('ContactesCtrl', function ($scope, contactService, $route) {
    $scope.createContactData = {};
    $scope.contactesData = {};

    contactService.getAgendaContacts("prova").then(function(data){
      console.log('SUCCES');
      $scope.contactesData = data.data;
    }, function () {
      console.log('FAILED');
    });

    $scope.createContactCon = function () {
      contactService.createContact($scope.createContactData.name, $scope.createContactData.surname,
        $scope.createContactData.company, $scope.createContactData.phone, "prova").then(function () {
          console.log('SUCCESS');
          $route.reload();
        }, function () {
          console.log('FAILED');
        });
    };
  });
