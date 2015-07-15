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
    $scope.agenda = {};

    $scope.agenda = contactService.getAgenda();

    contactService.getAgendaContacts("prova").then(function(data){
      console.log('SUCCES');
      $scope.contactesData = data.data;
    }, function () {
      console.log('FAILED');
    });

    $scope.createContactCon = function () {
      contactService.createContact($scope.createContactData.name, $scope.createContactData.surname,
        $scope.createContactData.company, $scope.createContactData.phone).then(function () {
          console.log('SUCCESS');
          $route.reload();
        }, function () {
          console.log('FAILED');
        });
    };

    $scope.deleteContactCon = function(contact) {
      var index = $scope.contactesData.indexOf(contact);
      $scope.contactesData.splice(index, 1);
      console.log(contact.name);
      contactService.deleteContact(contact.name, contact.surname).then(function () {
        console.log('SUCCES');
        //$route.reload();
      }, function(){
        console.log('FAILED');
      });
    };

  });
